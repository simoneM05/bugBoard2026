import { Service } from 'typedi';
import { CreateIssueDto } from '@dtos/issue.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Issue } from '@prisma/client';

@Service()
export class IssueService {
  public issue = prisma!.issue;

  public async findAllIssues(): Promise<Issue[]> {
    return await this.issue.findMany();
  }

  public async findIssueById(issueId: string): Promise<Issue> {
    const findIssue = await this.issue.findUnique({
      where: { id: issueId },
      include: { author: true, assignee: true, comments: true },
    });
    if (!findIssue) throw new HttpException(409, "Issue doesn't exist");
    return findIssue;
  }

  public async createIssue(issueData: CreateIssueDto, authorId: string): Promise<Issue> {
    return await this.issue.create({
      data: {
        title: issueData.title,
        description: issueData.description,
        priority: issueData.priority,
        image: issueData.image,
        type: issueData.type,
        status: issueData.status,
        createdAt: new Date(),
        author: { connect: { id: authorId } }, // relazione author
        assignee: issueData.assigneeId ? { connect: { id: issueData.assigneeId } } : undefined,
      },
    });
  }

  public async updateIssue(issueId: string, issueData: CreateIssueDto): Promise<Issue> {
    const existing = await this.issue.findUnique({ where: { id: issueId } });
    if (!existing) throw new HttpException(409, "Issue doesn't exist");
    return await this.issue.update({ where: { id: issueId }, data: issueData });
  }

  public async deleteIssue(issueId: string): Promise<Issue> {
    const existing = await this.issue.findUnique({ where: { id: issueId } });
    if (!existing) throw new HttpException(409, "Issue doesn't exist");
    return await this.issue.delete({ where: { id: issueId } });
  }

  // Filtro per userId
  public async findIssuesByUserId(userId: string): Promise<Issue[]> {
    return await this.issue.findMany({
      where: {
        OR: [{ authorId: userId }, { assigneeId: userId }],
      },
    });
  }

  public async findPaginatedIssues(page = 1, limit = 10): Promise<Issue[]> {
    const skip = (page - 1) * limit;
    return await this.issue.findMany({
      skip,
      take: limit,
    });
  }

  // Paginate con filtro userId
  public async findPaginatedUserIssues(userId: string, page = 1, limit = 10): Promise<Issue[]> {
    const skip = (page - 1) * limit;
    return await this.issue.findMany({
      where: {
        OR: [{ authorId: userId }, { assigneeId: userId }],
      },
      skip,
      take: limit,
    });
  }
}
