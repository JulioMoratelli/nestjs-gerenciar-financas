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

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.create(createEnderecoDto);
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
  update(
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.enderecosService.update(+id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return this.enderecosService.remove(clienteId, +id);
  }
}
