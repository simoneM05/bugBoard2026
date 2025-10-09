import { Service } from 'typedi';
import { CreateCommentDto } from '@dtos/comment.dto';
import { HttpException } from '@/exceptions/HttpException';
import { CommentIssue } from '@prisma/client';

@Service()
export class CommentService {
  public comment = prisma.commentIssue;

  public async findAllComments(): Promise<CommentIssue[]> {
    return await this.comment.findMany();
  }

  public async findCommentById(commentId: string): Promise<CommentIssue> {
    const findComment = await this.comment.findUnique({
      where: { id: commentId },
      include: { author: true, issue: true }, // Adatta secondo schema Prisma
    });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");
    return findComment;
  }

  public async createComment(commentData: CreateCommentDto): Promise<CommentIssue> {
    return await this.comment.create({ data: commentData });
  }

  public async updateComment(commentId: string, commentData: CreateCommentDto): Promise<CommentIssue> {
    const existing = await this.comment.findUnique({ where: { id: commentId } });
    if (!existing) throw new HttpException(409, "Comment doesn't exist");
    return await this.comment.update({ where: { id: commentId }, data: commentData });
  }

  public async deleteComment(commentId: string): Promise<CommentIssue> {
    const existing = await this.comment.findUnique({ where: { id: commentId } });
    if (!existing) throw new HttpException(409, "Comment doesn't exist");
    return await this.comment.delete({ where: { id: commentId } });
  }

  public async findCommentsByIssueId(issueId: string): Promise<CommentIssue[]> {
    return await this.comment.findMany({
      where: { issueId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
