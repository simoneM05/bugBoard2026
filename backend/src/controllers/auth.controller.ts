import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  /**
   * SignUp - Crea un nuovo utente
   * todo: Remove in production
   */
  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, tokens } = await this.auth.signup(userData);

      // Imposta refresh token come httpOnly cookie
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        data: {
          user,
          accessToken: tokens.accessToken,
        },
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login - Genera access token e refresh token
   */
  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, tokens } = await this.auth.login(userData);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        data: {
          user,
          accessToken: tokens.accessToken,
        },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh - Rinnova access token usando refresh token
   */
  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token non trovato' });
        return;
      }

      const newTokens = await this.auth.refreshAccessToken(refreshToken);

      res.cookie('refreshToken', newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        data: {
          accessToken: newTokens.accessToken,
        },
        message: 'token refreshed',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout - Invalida refresh token
   */
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;

      await this.auth.logout(userId);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({
        data: null,
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };
}
