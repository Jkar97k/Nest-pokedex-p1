import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from 'generated/prisma/client';
import { TaskRepository } from './repo/task.repository';
import { TaskResponse } from './entities/task.entity';
import { EncrypAdapter } from '../common/Adapters/encryp.adapter';

@Injectable()
export class TaskService {

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly EncrypAdapter: EncrypAdapter
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll(): Promise<users[]> {
    return  await this.taskRepository.findAll();
  }

  async findOne(email: string) {
    const user = await this.taskRepository.findByEmail(email);
    if (!user) throw new NotFoundException();
    return this.mapToResponse(user);
  }

  async findOneForAuth(email: string) {
    return await this.taskRepository.findByEmail(email);
  }



  async update(email: string, updateTaskDto: UpdateTaskDto) {
    
    const user = this.taskRepository.findByEmail(email);
    if (!user) throw new NotFoundException();

    const { password_hash } = updateTaskDto;

    if (!password_hash) {
      throw new NotFoundException('Password hash is required for update');
    }

    updateTaskDto.password_hash = await this.EncrypAdapter.hashPassword( password_hash);

    console.log('Received password for update:', password_hash);
    console.log('Password hash after encryption:', updateTaskDto.password_hash);

    const updatedUser = await this.taskRepository.updateTask(email, updateTaskDto);

    return this.mapToResponse(updatedUser);

  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  // users.service.ts

private mapToResponse(user:users ): TaskResponse {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    bio: user.bio,
    avatar_url: user.avatar_url,
    birth_date: user.birth_date,
    gender: user.gender,
    phone: user.phone,
    privacy: user.privacy,
    receive_notifications: user.receive_notifications,
    last_login: user.last_login,
    status: user.status,
    // Nota que excluimos password_hash, created_at, updated_at y deleted_at
  };
}
}
