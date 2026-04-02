import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private jwtService: JwtService
    ) {}

    //   // 💡 Here the JWT secret key that's used for signing the payload 
    //   // is the key that was passed in the JwtModule
    async GenerateToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    async ValidateToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (e) {
            return null; // Token inválido o expirado
        }
    }
}
