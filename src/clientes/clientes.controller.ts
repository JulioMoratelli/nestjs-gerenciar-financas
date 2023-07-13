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
import { ClienteComEnderecoDto } from './dto/clienteEndereco.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private prisma: PrismaService,
  ) {}

  @Post('clienteComEndereco')
  @UseInterceptors()
  async createClienteComEndereco(
    @Body() clienteComEnderecoDto: ClienteComEnderecoDto | CreateClienteDto,
  ) {
    return await this.clientesService.clienteComEndereco(clienteComEnderecoDto);
  }

  @Get(':id')
  @UseInterceptors()
  async findOne(@Param('id') id: number): Promise<ClientesEntity> {
    const cliente = await this.clientesService.findOne(+id);
    return new ClientesEntity(cliente);
  }

  @Get('enderecos/:id')
  @UseInterceptors()
  async findAllClienteEndereco(
    @Param('id') id: number,
  ): Promise<ClientesEntity[]> {
    const comEndereco = await this.clientesService.findAllClienteEndereco(id);
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
    return await this.prisma.$transaction(async () => {
      const delet = this.clientesService.remove(+id);
      return delet;
    });
  }
}
