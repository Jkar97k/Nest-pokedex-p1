import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TaskService } from 'src/task/task.service';
import { EncrypAdapter } from 'src/common/Adapters/encryp.adapter';
import { AuthenticationService } from './authentication/authentication.service';
import { loginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/register.dto';
import e from 'express';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';



@Injectable()
export class AuthService {
  
  constructor(
    private readonly taskService: TaskService,
    private encrypAdapter: EncrypAdapter,
    private jwtService: AuthenticationService
  ) {}


  async signIn(reques:loginDto): Promise<any> {

    const { email, password } = reques;

    const user = await this.taskService.findOneForAuth(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const { password_hash, ...result } = user;

    if (!password_hash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(password);
    console.log(password_hash);

    const compare = await this.encrypAdapter.validateUser(password,password_hash);

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.email, username: user.username ,userLastname: user.last_name};

    // const hashMatch = await this.encrypAdapter.hashPassword(password);

    // const validacion = await this.encrypAdapter.validateUser(password,password_hash);

    const token = await this.jwtService.GenerateToken(payload);


    console.log(result);
    console.log(payload);
    // console.log(hashMatch);
    console.log(token);

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { token };
  }

  // auth/auth.service.ts
  async signUp(registerDto: RegisterDto) {
    try {
      
      const { password,email,birth_date, ...userData } = registerDto;

      console.log('userData:', userData);

      // 1. Verificar si el email o username ya existen
      const existingUser = await this.taskService.findOneForAuth(email);

      if (existingUser) {
        throw new BadRequestException('El correo ya está registrado');
      }

      // 2. Hashear la contraseña
      const passwordHash = await this.encrypAdapter.hashPassword(password);

      const createUserDto: CreateTaskDto = {
          ...userData,
          password_hash: passwordHash,
          email: email,
          // Convertimos el string ISO a objeto Date de JS
          birth_date: birth_date ? new Date(birth_date) : undefined,
        };

      // 3. Guardar en la base de datos a través del repositorio
      // (Asumiendo que creas un método en usersService que llame al repository)
      return  await this.taskService.create(createUserDto);
    } 
    catch (error) {
      throw new BadRequestException('Error al registrar el usuario: ' + error.message);
    }

  }

  async deleteUser(email: string) {
    try {
     return await this.taskService.remove(email);
       
    } catch (error) {
      throw new BadRequestException('Error al eliminar el usuario: ' + error.message);
    }
  }
}
