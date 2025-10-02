import { Prisma } from '@prisma/client';

export type UserWithIssues = Prisma.UserGetPayload<{ include: { authoredIssues: true; assignedIssues: true } }>;
export type User = Prisma.UserGetPayload<{ include: { authoredIssues: true; assignedIssues: true } }>;
