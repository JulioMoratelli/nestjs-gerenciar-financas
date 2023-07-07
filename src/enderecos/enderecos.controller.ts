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
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoEntity } from './entities/endereco.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('enderecos')
export class EnderecosController {
  constructor(
    private readonly enderecosService: EnderecosService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createEnderecoDto: CreateEnderecoDto) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.enderecosService.create(createEnderecoDto);
      });
    } catch (err) {}
  }

  @Get()
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
