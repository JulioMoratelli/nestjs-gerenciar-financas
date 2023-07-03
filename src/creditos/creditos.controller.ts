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
    try {
      return await this.prisma.$transaction(async () => {
        return this.creditosService.create(createCreditoDto);
      });
    } catch (err) {}
  }

  @Get()
  async findAll(
    @Param('id') id: number,
    @Param('clienteId') clienteId: number,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.creditosService.findAll(clienteId, id);
      });
    } catch (err) {}
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param('clienteId') clienteId: number,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.creditosService.findOne(+id, clienteId);
      });
    } catch (err) {}
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('clienteId') clienteId: number,
    @Body() updateCreditoDto: UpdateCreditoDto,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.creditosService.update(+id, clienteId, updateCreditoDto);
      });
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('clienteId') clienteId: number) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.creditosService.remove(+id, clienteId);
      });
    } catch (err) {}
  }
}
