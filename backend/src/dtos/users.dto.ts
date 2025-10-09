import { z } from 'zod';

// Enum Role come array stringhe case sensitive
const RoleEnum = z.enum(['admin', 'user', 'stakeholder']);

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(9, 'Password must be at least 9 characters').max(32, 'Password must be at most 32 characters'),
  role: RoleEnum.optional(),
});

export const UpdateUserSchema = z.object({
  password: z.string().min(9, 'Password must be at least 9 characters').max(32, 'Password must be at most 32 characters'),
  role: RoleEnum.optional(),
});

// Tipi TypeScript inferiti
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
