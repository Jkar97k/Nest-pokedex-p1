import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from 'generated/prisma/client';

@Injectable()
export class TaskService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll(): Promise<users[]> {
    return  await this.prisma.users.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email: email
      }
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
