import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { prisma } from '@/utils/prisma';

const getAuthorization = (req: Request): string | null => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
      return next(new HttpException(404, 'Authentication token missing'));
    }

    const verified = verify(Authorization, SECRET_KEY!);
    if (typeof verified !== 'object' || verified === null || !('id' in verified)) {
      return next(new HttpException(401, 'Wrong authentication token'));
    }

    const { id } = verified as DataStoredInToken;

    const findUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        refreshToken: true,
      },
    });

    if (!findUser) {
      return next(new HttpException(401, 'Wrong authentication token'));
    }

    // Cast esplicito di req a RequestWithUser per assegnare user
    (req as RequestWithUser).user = findUser;

    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
