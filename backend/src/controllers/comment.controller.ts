import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@prisma/client';
import { CreateCommentDto } from '@/dtos';
import { CommentIssue } from '@prisma/client';
import { HttpException } from '@/exceptions';
import { canPerformAction } from '@/utils/permission';
import { CommentService } from '@/services';

export class CommentController {
  public commentService = Container.get(CommentService);

  public getAllComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'comments', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const comments: CommentIssue[] = await this.commentService.findAllComments();
      res.status(200).json({ data: comments, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'comments', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const commentId = req.params.id;
      const comment = await this.commentService.findCommentById(commentId);
      res.status(200).json({ data: comment, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'comments', 'write', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const commentData: CreateCommentDto = req.body;
      const created = await this.commentService.createComment(commentData);
      res.status(201).json({ data: created, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      const commentId = req.params.id;
      const existing = await this.commentService.findCommentById(commentId);
      if (!existing) throw new HttpException(404, "Comment doesn't exist");

      if (reqWithUser.user.role !== 'admin' && existing.authorId !== reqWithUser.user.id) {
        throw new HttpException(403, 'Permission denied');
      }

      const commentData: CreateCommentDto = req.body;
      const updated = await this.commentService.updateComment(commentId, commentData);
      res.status(200).json({ data: updated, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      const commentId = req.params.id;
      const existing = await this.commentService.findCommentById(commentId);
      if (!existing) throw new HttpException(404, "Comment doesn't exist");

      if (reqWithUser.user.role !== 'admin' && existing.authorId !== reqWithUser.user.id) {
        throw new HttpException(403, 'Permission denied');
      }

      const deleted = await this.commentService.deleteComment(commentId);
      res.status(200).json({ data: deleted, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentsByIssueId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqWithUser = req as Request & { user: User };
      if (!canPerformAction(reqWithUser.user.role, 'comments', 'read', { userId: reqWithUser.user.id })) {
        throw new HttpException(403, 'Permission denied');
      }
      const issueId = req.params.issueId;
      const comments = await this.commentService.findCommentsByIssueId(issueId);
      res.status(200).json({ data: comments, message: 'findByIssueId' });
    } catch (error) {
      next(error);
    }
  };
}
