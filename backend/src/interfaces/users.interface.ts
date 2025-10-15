import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{ include: { authoredIssues: true; assignedIssues: true } }>;

// Tipo User senza relazioni (per auth middleware)
export type UserWithoutIssues = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    password: true;
    role: true;
    refreshToken: true;
  };
}>;

// Tipo User senza password (per response sicura)
export type UserSafe = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    role: true;
  };
}>;

// Tipo User completo (se serve con relazioni)
export type UserWithIssues = Prisma.UserGetPayload<{
  include: {
    authoredIssues: true;
    assignedIssues: true;
    comments: true;
  };
}>;
