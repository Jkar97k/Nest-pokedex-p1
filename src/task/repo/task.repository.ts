import { Injectable } from "@nestjs/common";
import { Prisma, users } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { CreateTaskDto } from "../dto/create-task.dto";



@Injectable()
export class TaskRepository {
      constructor(
        private readonly prisma: PrismaService
      ) {}

    async findAll(): Promise<users[]> {
        return  await this.prisma.users.findMany();
    }

    async findByEmail(email: string): Promise<users | null> {
        return await this.prisma.users.findUnique({
        where: {
            email: email
        }
        });
    }

    async updateTask(email: string, data: UpdateTaskDto): Promise<users> {
        try {
            return await this.prisma.users.update({
            where: { email },
            data,
            });
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    // users/repositories/users.repository.ts
        async createUser(data: Prisma.usersCreateInput): Promise<users> { // Luego cambiaremos 'any' por un tipo específico de Prisma
        return await this.prisma.users.create({data});
        }

        async deleteUser(email: string): Promise<void> {
            await this.prisma.users.delete({
                where: { email },
            });
        }
}