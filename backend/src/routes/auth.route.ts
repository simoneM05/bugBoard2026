import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserSchema } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
export class AuthRoute implements Routes {
  public path = '/auth';
  public router: ExpressRouter = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // SignUp - nuovo endpoint
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserSchema), this.auth.signUp);

    // Login
    this.router.post(`${this.path}/login`, ValidationMiddleware(CreateUserSchema), this.auth.logIn);

    // Refresh
    this.router.post(`${this.path}/refresh`, this.auth.refresh);

    // Logout
    this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logOut);
  }
}
