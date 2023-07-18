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

// @ApiHeader()
@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private prisma: PrismaService,
  ) {}

  @Post(':clienteId')
  async create(
    @Param('clienteId') clienteId: number,
    @Body() createContaDto: CreateContaDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.create(clienteId, createContaDto, trx);
    });
  }

  @Get(':clienteId')
  findAll(@Param('clienteId') clienteId: number) {
    return this.contasService.findAll(clienteId);
  }

  @Get(':clienteId/:id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.contasService.findOne(clienteId, +id);
  }

  @Patch(':clienteId/:id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.update(clienteId, +id, updateContaDto, trx);
    });
  }

  @Delete(':clienteId/:id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.remove(clienteId, +id, trx);
    });
  }
}

// function ApiHeader(
//   clienteId: number,
//   id: number,
// ): (target: typeof ContasController) => void | typeof ContasController {
//   throw new Error('Function not implemented.');
// }
