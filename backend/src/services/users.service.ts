import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { UserWithIssues } from '@/interfaces';

@Service()
export class UserService {
  public user = prisma.user;

  public async findAllUser(): Promise<UserWithIssues[]> {
    return await this.user.findMany({
      include: {
        authoredIssues: true,
        assignedIssues: true,
        comments: true,
      },
    });
  }

  public async findUserById(userId: string): Promise<UserWithIssues> {
    const findUser = await this.user.findUnique({
      where: { id: userId },
      include: { authoredIssues: true, assignedIssues: true, comments: true },
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }

  public async createUser(userData: CreateUserDto) {
    const existing = await this.user.findUnique({ where: { email: userData.email } });
    if (existing) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    return await this.user.create({ data: { ...userData, password: hashedPassword } });
  }

  public async updateUser(userId: string, userData: CreateUserDto) {
    const existing = await this.user.findUnique({ where: { id: userId } });
    if (!existing) throw new HttpException(409, "User doesn't exist");
    const hashedPassword = await hash(userData.password, 10);
    return await this.user.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
  }

  public async deleteUser(userId: string) {
    const existing = await this.user.findUnique({ where: { id: userId } });
    if (!existing) throw new HttpException(409, "User doesn't exist");
    return await this.user.delete({ where: { id: userId } });
  }
}
