import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('creditos')
export class CreditosController {
  constructor(
    private readonly creditosService: CreditosService,
    public prisma: PrismaService,
  ) {}

  @Post(':clienteId')
  async create(
    @Param('clienteId') clienteId: number,
    @Body() createCreditoDto: CreateCreditoDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.creditosService.create(clienteId, createCreditoDto, trx);
    });
  }

  @Get(':clienteId')
  async findAll(@Param('clienteId') clienteId: number) {
    return await this.prisma.$transaction(async () => {
      return this.creditosService.findAll(clienteId);
    });
  }

  @Get(':clienteId/:id')
  async findOne(
    @Param('id') id: string,
    @Param('clienteId') clienteId: number,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.creditosService.findOne(+id, clienteId);
    });
  }

  @Patch(':clienteId/:id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateCreditoDto: UpdateCreditoDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.creditosService.update(clienteId, +id, updateCreditoDto, trx);
    });
  }

  @Delete(':clienteId/:id')
  async remove(@Param('id') id: string, @Param('clienteId') clienteId: number) {
    return await this.prisma.$transaction(async (trx) => {
      return this.creditosService.remove(+id, clienteId, trx);
    });
  }
}
