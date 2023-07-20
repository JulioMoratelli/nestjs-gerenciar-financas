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
import { EnderecosService } from './enderecos.service';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoEntity } from './entities/endereco.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Controller('enderecos')
export class EnderecosController {
  constructor(
    private readonly enderecosService: EnderecosService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(
    @Req() request: ExtendedRequest,
    createEnderecoDto: CreateEnderecoDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.enderecosService.create(clienteId, createEnderecoDto, trx);
    });
  }

  // @Post(':clienteId')
  // async createComEndereco(
  //   @Req() request: ExtendedRequest,
  //   clienteComEnderecoDto: ClienteComEnderecoDto,
  // ) {
  //   const clienteId = request.clienteId;

  //   return await this.prisma.$transaction(async (trx) => {
  //     return this.enderecosService.createComCliente(
  //       clienteId,
  //       clienteComEnderecoDto,
  //       trx,
  //     );
  //   });
  // }

  @Get()
  findAll(@Req() request: ExtendedRequest) {
    const clienteId = request.clienteId;

    return this.enderecosService.findAll(clienteId);
  }

  @Get(':id')
  findOne(
    @Req() request: ExtendedRequest,
    @Param('id') id: string,
  ): Promise<EnderecoEntity> {
    const clienteId = request.clienteId;

    return this.enderecosService.findOne(clienteId, +id);
  }

  @Patch(':id')
  async update(
    @Req() request: ExtendedRequest,
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    try {
      const clienteId = request.clienteId;

      return await this.prisma.$transaction(async (trx) => {
        return this.enderecosService.update(
          clienteId,
          +id,
          updateEnderecoDto,
          trx,
        );
      });
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Req() request: ExtendedRequest, @Param('id') id: string) {
    try {
      const clienteId = request.clienteId;

      return await this.prisma.$transaction(async (trx) => {
        return this.enderecosService.remove(clienteId, +id, trx);
      });
    } catch (err) {}
  }
}
