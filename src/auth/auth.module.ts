import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TaskModule } from 'src/task/task.module';
import { jwtConstants } from './config/constants';
import { CommonModule } from 'src/common/common.module';
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TaskModule,
    CommonModule,
    AuthenticationModule
  ],
  exports: [AuthService],
})
export class AuthModule {}