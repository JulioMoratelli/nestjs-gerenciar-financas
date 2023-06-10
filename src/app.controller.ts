import { IsNotEmpty, IsEmail } from 'class-validator';
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    const teste = await this.prisma.cliente.create({
      data: {
        email: 'aaaaa@gmail.com',
        cpf: 111,
        nome: 'teste',
        sobrenome: 'teste',
      },
    });
    return teste;
  }
}
