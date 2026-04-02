import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TaskService } from 'src/task/task.service';
import { EncrypAdapter } from 'src/common/Adapters/encryp.adapter';
import { AuthenticationService } from './authentication/authentication.service';
import { loginDto } from './dto/Login.dto';



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

}
