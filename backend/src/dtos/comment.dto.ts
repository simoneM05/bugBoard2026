import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

// DTO per CommentIssue
export class CreateCommentIssueDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsMongoId()
  public authorId: string;

  @IsMongoId()
  public issueId: string;
}

export class UpdateCommentIssueDto {
  @IsString()
  @IsOptional()
  public comment?: string;

  @IsMongoId()
  @IsOptional()
  public authorId?: string;

  @IsMongoId()
  @IsOptional()
  public issueId?: string;
}
