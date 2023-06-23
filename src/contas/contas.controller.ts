import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.create(createContaDto);
  }

  @Get(':clienteId')
  findAll(@Param('clienteId') clienteId: number) {
    return this.contasService.findAll(clienteId);
  }

  @Get(':id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.contasService.findOne(clienteId, +id);
  }

  @Patch(':id')
  update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    return this.contasService.update(clienteId, +id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return this.contasService.remove(clienteId, +id);
  }
}
