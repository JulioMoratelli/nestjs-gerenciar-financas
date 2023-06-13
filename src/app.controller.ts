import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    const teste = await this.prisma.cliente.create({
      data: {
        email: 'ggggggg@gmail.com',
        cpf: '240218',
        nome: 'testeY',
        sobrenome: 'testeY',
      },
    });
    return teste;
  }
}
