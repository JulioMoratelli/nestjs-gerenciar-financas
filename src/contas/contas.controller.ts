import { ExtendedRequest } from './../middleware/extended-request.interface';
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
  async create(
    @Req() request: ExtendedRequest,
    @Body() createContaDto: CreateContaDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.create(clienteId, createContaDto, trx);
    });
  }

  @Get()
  findAll(@Req() request: ExtendedRequest) {
    const clienteId = request.clienteId;

    return this.contasService.findAll(clienteId);
  }

  @Get(':id')
  findOne(@Req() request: ExtendedRequest, @Param('id') id: number) {
    const clienteId = request.clienteId;

    return this.contasService.findOne(clienteId, +id);
  }

  @Patch(':id')
  async update(
    @Req() request: ExtendedRequest,
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.update(clienteId, +id, updateContaDto, trx);
    });
  }

  @Delete(':id')
  async remove(@Req() request: ExtendedRequest, @Param('id') id: string) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.contasService.remove(clienteId, +id, trx);
    });
  }
}

// function Res(): (target: ContasController, propertyKey: "create", parameterIndex: 0) => void {
//   throw new Error('Function not implemented.');
// }
// function ApiHeader(
//   clienteId: number,
//   id: number,
// ): (target: typeof ContasController) => void | typeof ContasController {
//   throw new Error('Function not implemented.');
// }
