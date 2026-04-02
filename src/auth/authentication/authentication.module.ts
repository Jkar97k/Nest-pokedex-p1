import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  imports: [
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
  ]
})
export class AuthenticationModule {}
