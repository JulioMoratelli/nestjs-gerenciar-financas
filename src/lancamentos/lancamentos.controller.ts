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

  @Post()
  async create(@Body() createLancamentoDto: CreateLancamentoDto) {
    return this.lancamentosService.create(createLancamentoDto);
  }

  @Get(':clienteId')
  async findAll(@Param('clienteId') clienteId: number) {
    return await this.prisma.$transaction(async () => {
      return this.lancamentosService.findAll(clienteId);
    });
  }

  @Get(':id')
  async findOne(
    @Param('clienteId') clienteId: number,
    @Param('id') id: number,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.lancamentosService.findOne(+id, clienteId);
    });
  }

  @Patch(':id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.lancamentosService.update(
        clienteId,
        +id,
        updateLancamentoDto,
      );
    });
  }

  @Delete(':id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return await this.prisma.$transaction(async () => {
      return this.lancamentosService.remove(+id, clienteId);
    });
  }
}
