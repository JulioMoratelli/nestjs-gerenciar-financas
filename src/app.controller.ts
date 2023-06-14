import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    const teste = await this.prisma.endereco.create({
      data: {
        bairro: 'ccccc',
        cep: 17,
        cidade: 'ccccc',
        numero: 50,
        padrao: true,
        rua: 'ccccc',
        clienteId: 1,
      },
    });
    return teste;
  }
}
