import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';

// ENUMS corrispondenti
export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum TypeIssue {
  question = 'question',
  bug = 'bug',
  feature = 'feature',
  documentation = 'documentation',
}

export enum Status {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
}

export enum Role {
  admin = 'admin',
  user = 'user',
}

// DTO per User (creazione e update)
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsEnum(Role)
  @IsOptional()
  public role?: Role;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsEnum(Role)
  @IsOptional()
  public role?: Role;
}
