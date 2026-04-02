import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  IsBoolean, 
  IsDateString, 
  MinLength, 
  IsUrl,
  IsPhoneNumber,
  IsNotEmpty
} from 'class-validator';

export class CreateTaskDto {

    @IsEmail({host_whitelist: ['pascualbravo.edu.co']}, { message: 'El formato del correo es inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsUrl()
    @IsOptional()
    avatar_url?: string;

    @IsDateString()
    @IsOptional()
    birth_date?: Date;

    @IsString()
    @IsOptional()
    gender?: string;

    //@IsPhoneNumber() // 'null' permite detectar el país automáticamente por el prefijo (+57, etc)
    @IsOptional()
    phone?: string;

    @IsBoolean()
    @IsOptional()
    privacy: boolean = true;

    @IsBoolean()
    @IsOptional()
    receive_notifications: boolean = true;

    @IsString()
    //@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password_hash: string;
}