import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createContaDto: CreateContaDto) {
    return await this.prisma.$transaction(async () => {
      return this.contasService.create(createContaDto);
    });
  }

  @Get(':clienteId')
  findAll(@Param('clienteId') clienteId: number) {
    return this.contasService.findAll(clienteId);
  }

  @Get(':id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.contasService.findOne(clienteId, +id);
  }

  @Patch(':id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.contasService.update(clienteId, +id, updateContaDto);
    });
  }

  @Delete(':id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return await this.prisma.$transaction(async () => {
      return this.contasService.remove(clienteId, +id);
    });
  }
}
