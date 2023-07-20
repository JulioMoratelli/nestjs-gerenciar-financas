import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtendedRequest } from 'src/middleware/extended-request.interface';

@Controller('creditos')
export class CreditosController {
  constructor(
    private readonly creditosService: CreditosService,
    public prisma: PrismaService,
  ) {}

  @Post(':clienteId')
  async create(
    @Req() request: ExtendedRequest,
    @Body() createCreditoDto: CreateCreditoDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.creditosService.create(clienteId, createCreditoDto, trx);
    });
  }

  @Get(':clienteId')
  async findAll(@Req() request: ExtendedRequest) {
    const clienteId = request.clienteId;

    return this.creditosService.findAll(clienteId);
  }

  @Get(':id')
  async findOne(@Req() request: ExtendedRequest, @Param('id') id: string) {
    const clienteId = request.clienteId;

    return this.creditosService.findOne(+id, clienteId);
  }

  // @Patch(':clienteId/:id')
  // async update(
  //   @Param('clienteId') clienteId: number,
  //   @Param('id') id: string,
  //   @Body() updateCreditoDto: UpdateCreditoDto,
  // ) {
  //   return await this.prisma.$transaction(async (trx) => {
  //     return this.creditosService.update(clienteId, +id, updateCreditoDto, trx);
  //   });
  // }

  // @Delete(':clienteId/:id')
  // async remove(@Param('id') id: string, @Param('clienteId') clienteId: number) {
  //   return await this.prisma.$transaction(async (trx) => {
  //     return this.creditosService.remove(+id, clienteId, trx);
  //   });
  // }
}
