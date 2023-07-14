import { PrismaService } from './../prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesEntity } from './entities/cliente.entity';
import { ClienteComEnderecoDto } from './dto/clienteEndereco.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private prisma: PrismaService,
  ) {}

  @Post('clienteComEndereco')
  async createClienteComEndereco(
    // @Body() clienteComEnderecoDto: ClienteComEnderecoDto | CreateClienteDto,
    @Body() clienteComEnderecoDto: ClienteComEnderecoDto,
  ) {
    try {
      return await this.clientesService.createClienteComEndereco(
        clienteComEnderecoDto,
      );
    } catch (err) {
      err.description = err.message;
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ClientesEntity> {
    const cliente = await this.clientesService.findOne(+id);
    return new ClientesEntity(cliente);
  }

  @Get()
  async findAllClienteEndereco(): Promise<ClientesEntity[]> {
    const comEndereco = await this.clientesService.findAllClienteEndereco();
    const clientesEntities = comEndereco.map(
      (result) => new ClientesEntity(result),
    );
    return clientesEntities;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return await this.prisma.$transaction(async () => {
      const update = this.clientesService.update(+id, updateClienteDto);
      return update;
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.prisma.$transaction(async (trx) => {
      const delet = this.clientesService.remove(+id, trx);
      return delet;
    });
  }
}
