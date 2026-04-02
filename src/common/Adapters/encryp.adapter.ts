import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';


@Injectable()
export class EncrypAdapter {

    constructor(private config: ConfigService) 
    {}

   async hashPassword(password: string): Promise<string> {

    const saltOrRounds = +this.config.get('BCRYPT_SALT_ROUNDS') || 10; // El nivel de seguridad (coste)
    console.log(`Hashing password with ${saltOrRounds} salt rounds...`);
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

    async validateUser(password: string, storedHash: string): Promise<boolean> {
        return await bcrypt.compare(password, storedHash);
    }
}