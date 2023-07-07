import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientesEntity } from './entities/cliente.entity';
import { Expose } from 'class-transformer';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      return await this.prisma.$transaction(async () => {
        const create = this.clientesService.create(createClienteDto);
        return create;
      });
    } catch (err) {}
  }

  @Get(':id')
  @UseInterceptors(Expose)
  async findOne(@Param('id') id: number): Promise<ClientesEntity> {
    try {
      return this.clientesService.findOne(+id);
    } catch (err) {}
  }

  @Get('enderecos/:id')
  async findAllClienteEndereco(@Param('id') id: number) {
    try {
      return this.clientesService.findAllClienteEndereco(id);
    } catch (err) {}
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        const update = this.clientesService.update(+id, updateClienteDto);
        return update;
      });
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.prisma.$transaction(async () => {
        const delet = this.clientesService.remove(+id);
        return delet;
      });
    } catch (err) {}
  }
}
