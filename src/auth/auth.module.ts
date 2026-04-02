import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TaskModule } from 'src/task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
  imports: [
    TaskModule,
    JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          global: true,
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'), // Lee de tu .env
            signOptions: { 
              expiresIn: '180s', // 3 minutos, ¡muy seguro!
            },
          }),
        }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
