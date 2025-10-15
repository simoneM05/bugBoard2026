import { Request } from 'express';
import { UserWithoutIssues } from './users.interface';

export interface TokenData {
  token: string;
  expiresIn: number;
}
export interface DataStoredInToken {
  id: string; // MongoDB usa string (_id)
}

export interface RequestWithUser extends Request {
  user: UserWithoutIssues;
}
