import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskRepository } from './repo/task.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService]
})
export class TaskModule {}
