import { z } from 'zod';

// Definizione enum corrispondenti
const PriorityEnum = z.enum(['low', 'medium', 'high']);
const TypeIssueEnum = z.enum(['question', 'bug', 'feature', 'documentation']);
const StatusEnum = z.enum(['ToDo', 'InProgress', 'Done']);

export const CreateIssueSchema = z.object({
  priority: PriorityEnum.optional(),
  image: z.string().optional(),
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  type: TypeIssueEnum.optional(),
  status: StatusEnum.optional(),
  assigneeId: z.string().optional(),
});

export const UpdateIssueSchema = z.object({
  priority: PriorityEnum.optional(),
  image: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  type: TypeIssueEnum.optional(),
  status: StatusEnum.optional(),
  assigneeId: z.string().optional(),
});

// Tipi TypeScript inferiti dai schemi
export type CreateIssueDto = z.infer<typeof CreateIssueSchema>;
export type UpdateIssueDto = z.infer<typeof UpdateIssueSchema>;
