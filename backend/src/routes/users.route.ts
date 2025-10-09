import { IRouter, Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateUserSchema } from '@/dtos';
import { AuthMiddleware } from '@/middlewares';

export class UserRoute implements Routes {
  public path = '/users';
  public router: IRouter = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.getUserById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateUserSchema), this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateUserSchema), this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.deleteUser);
  }
}
