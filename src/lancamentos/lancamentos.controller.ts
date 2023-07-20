import { ExtendedRequest } from './../middleware/extended-request.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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

  @Post()
  async create(
    @Req() request: ExtendedRequest,
    @Body() createLancamentoDto: CreateLancamentoDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.create(
        clienteId,
        createLancamentoDto,
        trx,
      );
    });
  }

  @Get()
  async findAll(@Req() request: ExtendedRequest) {
    const clienteId = request.clienteId;

    return this.lancamentosService.findAll(clienteId);
  }

  @Get(':id')
  async findOne(@Req() request: ExtendedRequest, @Param('id') id: number) {
    const clienteId = request.clienteId;

    return this.lancamentosService.findOne(+id, clienteId);
  }

  @Patch(':id')
  async update(
    @Req() request: ExtendedRequest,
    @Param('id') id: string,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.update(
        clienteId,
        +id,
        updateLancamentoDto,
        trx,
      );
    });
  }

  @Delete(':id')
  async remove(@Req() request: ExtendedRequest, @Param('id') id: string) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.lancamentosService.remove(+id, clienteId, trx);
    });
  }
}
