import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    
    // 1. Creamos el Pool de conexiones de 'pg'
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // 2. Aquí es donde manejas el error del certificado
      ssl: {
        rejectUnauthorized: false, // Permite certificados autofirmados (típico en Render/Supabase/Neon)
      },
    });

    // 3. Pasamos el pool al adaptador de Prisma
    const adapter = new PrismaPg(pool);

    // 4. Inicializamos la clase padre con el adaptador
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}