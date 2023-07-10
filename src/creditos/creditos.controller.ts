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

  @Post()
  async create(@Body() createCreditoDto: CreateCreditoDto) {
    return await this.prisma.$transaction(async () => {
      return this.creditosService.create(createCreditoDto);
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('clienteId') clienteId: number,
    @Body() updateCreditoDto: UpdateCreditoDto,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.creditosService.update(+id, clienteId, updateCreditoDto);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('clienteId') clienteId: number) {
    return await this.prisma.$transaction(async () => {
      return this.creditosService.remove(+id, clienteId);
    });
  }
}
