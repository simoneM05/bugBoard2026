import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { CommentController } from '@/controllers';
import { Routes } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';
import { ValidationMiddleware } from '@/middlewares';
import { CreateCommentSchema } from '@/dtos';

export class CommentRoute implements Routes {
  public path = '/comments';
  public router: ExpressRouter = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all comments
    this.router.get(`${this.path}`, AuthMiddleware, this.commentController.getAllComments);

    // Get comment by id
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.commentController.getCommentById);

    // Create comment
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCommentSchema), this.commentController.createComment);

    // Update comment
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateCommentSchema), this.commentController.updateComment);

    // Delete comment
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.commentController.deleteComment);

    // Get comments by issue id
    this.router.get(`/issues/:issueId${this.path}`, AuthMiddleware, this.commentController.getCommentsByIssueId);
  }
}
