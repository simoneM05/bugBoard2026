import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string().nonempty('Content is required'),
  authorId: z.string().nonempty('AuthorId is required'),
  issueId: z.string().nonempty('IssueId is required'),
});

// Tipo TypeScript generato automaticamente da Zod
export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
