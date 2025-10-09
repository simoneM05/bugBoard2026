import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@prisma/client'; // Importa User dal prisma/client
import { UserService } from '@/services';
import { HttpException } from '@/exceptions';
import { canPerformAction } from '@/utils/permission';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'users', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const findAllUsersData: User[] = await this.user.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'users', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const userId = req.params.id;
      const findOneUserData: User = await this.user.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'users', 'write', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const userData: User = req.body;
      const createUserData = await this.user.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      const userId = req.params.id;
      // Admin aggiorna chiunque, user solo se stesso
      if (reqWithUser.user.role !== 'admin' && reqWithUser.user.id !== userId) {
        throw new HttpException(403, 'Permission denied');
      }
      const userData: User = req.body;
      const updateUserData = await this.user.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      // Solo admin può cancellare
      if (reqWithUser.user.role !== 'admin') {
        throw new HttpException(403, 'Permission denied');
      }
      const userId = req.params.id;
      const deleteUserData = await this.user.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
