import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { CreateIssueSchema, UpdateIssueSchema } from '@/dtos'; // Zod schemi
import { AuthMiddleware } from '@/middlewares';
import { ValidationMiddleware } from '@/middlewares';
import { IssueController } from '@/controllers';
import { Routes } from '@/interfaces';

export class IssueRoute implements Routes {
  public path = '/issues';
  public router: ExpressRouter = Router();
  public issueController = new IssueController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all (senza paginazione)
    this.router.get(`${this.path}`, AuthMiddleware, this.issueController.getIssues);

    // Get paginated (es: /issues/paginated?page=1&limit=10)
    this.router.get(`${this.path}/paginated`, AuthMiddleware, this.issueController.getPaginatedIssues);

    // Get by id
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.issueController.getIssueById);

    // Create issue
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateIssueSchema), this.issueController.createIssue);

    // Update issue (usa UpdateIssueSchema, campi opzionali)
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateIssueSchema), this.issueController.updateIssue);

    // Delete issue
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.issueController.deleteIssue);

    // Get issue by user id
    this.router.get(`${this.path}/user/:userId`, AuthMiddleware, this.issueController.getIssuesByUserId);

    // Get paginated by user id (es: /issues/user/:userId/paginated?page=1&limit=10)
    this.router.get(`${this.path}/user/:userId/paginated`, AuthMiddleware, this.issueController.getPaginatedIssuesByUserId);
  }
}
