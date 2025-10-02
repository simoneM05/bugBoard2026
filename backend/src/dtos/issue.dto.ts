import { Priority, TypeIssue, Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

// DTO per Issue
export class CreateIssueDto {
  @IsEnum(Priority)
  @IsOptional()
  public priority?: Priority;

  @IsString()
  @IsOptional()
  public image?: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsEnum(TypeIssue)
  @IsOptional()
  public type?: TypeIssue;

  @IsEnum(Status)
  @IsOptional()
  public status?: Status;

  @IsMongoId()
  public authorId: string;

  @IsMongoId()
  @IsOptional()
  public assigneeId?: string;
}

export class UpdateIssueDto {
  @IsEnum(Priority)
  @IsOptional()
  public priority?: Priority;

  @IsString()
  @IsOptional()
  public image?: string;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsEnum(TypeIssue)
  @IsOptional()
  public type?: TypeIssue;

  @IsEnum(Status)
  @IsOptional()
  public status?: Status;

  @IsMongoId()
  @IsOptional()
  public authorId?: string;

  @IsMongoId()
  @IsOptional()
  public assigneeId?: string;
}
