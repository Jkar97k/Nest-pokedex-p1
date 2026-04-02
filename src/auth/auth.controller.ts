import { Controller, Post, Body,  HttpCode, HttpStatus, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: loginDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Get('DTO')
  getAuthDto() {
  return {
      email: "",                // Requerido: @pascualbravo.edu.co
      username: "",             // Requerido: Min 3 caracteres
      password: "",             // Requerido: Min 8 caracteres
      first_name: "",           // Opcional
      last_name: "",            // Opcional
      phone: "",                // Opcional
      birth_date: "YYYY-MM-DD", // Opcional: Formato ISO
      receive_notifications: true // Opcional: Boolean
    };
  }

  @Delete('innactive')
  deleteUser(@Body('email') email: string) {
    return this.authService.deleteUser(email);
  }
}
