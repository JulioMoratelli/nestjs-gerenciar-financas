import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    const teste = await this.prisma.endereco.create({
      data: {
        bairro: 'netinho',
        cep: 17208190,
        cidade: 'jau',
        numero: 144,
        padrao: false,
        rua: 'adolfo diamente',
        clienteId: 1,
      },
    });
    return teste;
  }
}
