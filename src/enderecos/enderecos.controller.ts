import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoEntity } from './entities/endereco.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteComEnderecoDto } from 'src/clientes/dto/clienteEndereco.dto';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Controller('enderecos')
export class EnderecosController {
  constructor(
    private readonly enderecosService: EnderecosService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(
    @Body()
    createEnderecoDto: CreateEnderecoDto,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.enderecosService.create(createEnderecoDto);
    });
  }

  @Post()
  async createComEndereco(
    @Body() clienteId: number,
    clienteComEnderecoDto: ClienteComEnderecoDto,
  ) {
    return await this.prisma.$transaction(async () => {
      return this.enderecosService.createComCliente(
        clienteComEnderecoDto,
        clienteId,
      );
    });
  }

  @Get(':clienteId')
  findAll(@Param('clienteId') clienteId: number) {
    return this.enderecosService.findAll(clienteId);
  }

  @Get(':clienteId/:id')
  findOne(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
  ): Promise<EnderecoEntity> {
    return this.enderecosService.findOne(clienteId, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.enderecosService.update(+id, updateEnderecoDto);
      });
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.enderecosService.remove(clienteId, +id);
      });
    } catch (err) {}
  }
}
