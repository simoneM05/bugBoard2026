import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IssueService } from '@/services';
import { CreateIssueDto } from '@/dtos';
import { Issue, User } from '@prisma/client';
import { HttpException } from '@/exceptions';
import { canPerformAction } from '@/utils/permission';

export class IssueController {
  public issueService = Container.get(IssueService);

  public getIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const issues: Issue[] = await this.issueService.findAllIssues();
      res.status(200).json({ data: issues, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getIssueById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const issueId = req.params.id;
      const issue = await this.issueService.findIssueById(issueId);
      res.status(200).json({ data: issue, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      const canCreate = canPerformAction(reqWithUser.user.role, 'issues', 'write', { userId: reqWithUser.user.id, isCreation: true });
      if (!canCreate) throw new HttpException(403, 'Permission denied');

      const issueData: CreateIssueDto = req.body;
      const authorId = reqWithUser.user.id;

      const created = await this.issueService.createIssue(issueData, authorId);
      res.status(201).json({ data: created, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };

      const issueId = req.params.id;
      const issueData: CreateIssueDto = req.body;
      const existingIssue = await this.issueService.findIssueById(issueId);
      if (!existingIssue) throw new HttpException(404, 'Issue not found');

      const canUpdate = canPerformAction(reqWithUser.user.role, 'issues', 'write', {
        userId: reqWithUser.user.id,
        resourceOwnerId: existingIssue.authorId,
        assigneeId: existingIssue.assigneeId ?? '',
      });
      if (!canUpdate) throw new HttpException(403, 'Permission denied');

      const updated = await this.issueService.updateIssue(issueId, issueData);
      res.status(200).json({ data: updated, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };

      const issueId = req.params.id;
      const existingIssue = await this.issueService.findIssueById(issueId);
      if (!existingIssue) throw new HttpException(404, 'Issue not found');

      const canDelete = canPerformAction(reqWithUser.user.role, 'issues', 'delete', {
        userId: reqWithUser.user.id,
        resourceOwnerId: existingIssue.authorId,
      });
      if (!canDelete) throw new HttpException(403, 'Permission denied');

      const deleted = await this.issueService.deleteIssue(issueId);
      res.status(200).json({ data: deleted, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getIssuesByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'issues', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }

      const userId = req.params.userId;
      const issues = await this.issueService.findIssuesByUserId(userId);
      res.status(200).json({ data: issues, message: 'findByUserId' });
    } catch (error) {
      next(error);
    }
  };

  public getPaginatedIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'issues', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const issues = await this.issueService.findPaginatedIssues(page, limit);
      res.status(200).json({ data: issues, message: 'paginated' });
    } catch (error) {
      next(error);
    }
  };

  public getPaginatedIssuesByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'issues', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }

      const userId = req.params.userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const issues = await this.issueService.findPaginatedUserIssues(userId, page, limit);
      res.status(200).json({ data: issues, message: 'paginatedByUserId' });
    } catch (error) {
      next(error);
    }
  };
}
