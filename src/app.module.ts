import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { envConfig } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    PokemonModule,
    MongooseModule.forRoot(envConfig().mongodbUri),
    CommonModule,
    SeedModule,
    PrismaModule,
    TaskModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
