import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TaskService } from 'src/task/task.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly taskService: TaskService,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}


  async signIn(reques:CreateAuthDto): Promise<any> {

    const { email, password } = reques;

    const user = await this.taskService.findOne(email);

    // if (user?.password_hash !== pass) {
    //   throw new UnauthorizedException();
    // }
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password_hash, ...result } = user;

    const payload = { sub: user.email, username: user.username ,userLastname: user.last_name};

    const hashMatch = await this.hashPassword(password);

    const token = await this.GenerateToken(payload);


    console.log(result);
    console.log(payload);
    console.log(hashMatch);
    console.log(token);

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { ...result, token };


    //  const payload = { sub: user.userId, username: user.username };
    // return {
    //   // 💡 Here the JWT secret key that's used for signing the payload 
    //   // is the key that was passed in the JwtModule
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }


  private async hashPassword(password: string): Promise<string> {

    const saltOrRounds = +this.config.get('BCRYPT_SALT_ROUNDS') || 10; // El nivel de seguridad (coste)

    console.log(`Hashing password with ${saltOrRounds} salt rounds...`);

    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  private async validateUser(password: string, storedHash: string): Promise<boolean> {
    return await bcrypt.compare(password, storedHash);
  }

  private async GenerateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
