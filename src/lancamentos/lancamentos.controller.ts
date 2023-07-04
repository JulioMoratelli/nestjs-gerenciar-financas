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
    try {
      return await this.prisma.$transaction(async () => {
        return this.lancamentosService.create(createLancamentoDto);
      });
    } catch (err) {}
  }

  @Get(':clienteId')
  async findAll(@Param('clienteId') clienteId: number) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.lancamentosService.findAll(clienteId);
      });
    } catch (err) {}
  }

  @Get(':id')
  async findOne(
    @Param('clienteId') clienteId: number,
    @Param('id') id: number,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.lancamentosService.findOne(+id, clienteId);
      });
    } catch (err) {}
  }

  @Patch(':id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.lancamentosService.update(
          clienteId,
          +id,
          updateLancamentoDto,
        );
      });
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.lancamentosService.remove(+id, clienteId);
      });
    } catch (err) {}
  }
}
