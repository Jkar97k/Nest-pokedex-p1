import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class RegisterDto {
  @IsEmail({ host_whitelist: ['pascualbravo.edu.co'] }, { message: 'Solo se permiten correos de @pascualbravo.edu.co' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString() @IsOptional()
  first_name?: string;

  @IsString() @IsOptional()
  last_name?: string;
  

  @IsString() @IsOptional()
  phone?: string;

  @IsDateString() @IsOptional()
  birth_date?: string;

  @IsBoolean() @IsOptional()
  receive_notifications?: boolean;
}