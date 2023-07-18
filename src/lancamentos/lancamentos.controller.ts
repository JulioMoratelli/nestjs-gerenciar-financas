import { PrismaService } from 'src/prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';

@Controller('lancamentos')
export class LancamentosController {
  constructor(
    private readonly lancamentosService: LancamentosService,
    private prisma: PrismaService,
  ) {}

  @Post(':clienteId')
  async create(
    @Param('clienteId') clienteId: number,
    @Body() createLancamentoDto: CreateLancamentoDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.create(
        clienteId,
        createLancamentoDto,
        trx,
      );
    });
  }

  @Get(':clienteId')
  async findAll(@Param('clienteId') clienteId: number) {
    return this.lancamentosService.findAll(clienteId);
  }

  @Get(':id')
  async findOne(
    @Param('clienteId') clienteId: number,
    @Param('id') id: number,
  ) {
    return this.lancamentosService.findOne(+id, clienteId);
  }

  @Patch(':clienteId/:id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.update(
        clienteId,
        +id,
        updateLancamentoDto,
        trx,
      );
    });
  }

  @Delete(':clienteId/:id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.remove(+id, clienteId, trx);
    });
  }
}
