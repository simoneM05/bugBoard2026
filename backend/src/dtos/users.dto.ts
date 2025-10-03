import { Role } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';

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
