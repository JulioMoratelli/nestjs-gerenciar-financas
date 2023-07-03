import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';

@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  @Post()
  create(@Body() createParcelaDto: CreateParcelaDto) {
    return this.parcelasService.create(createParcelaDto);
  }

  @Get()
  findAll(clienteId: number, lancamentoId: number) {
    return this.parcelasService.findAll(clienteId, lancamentoId);
  }

  @Get(':id')
  findOne(
    @Param('clienteId') clienteId: number,
    @Param('lancamentoId') lancamentoId: number,
    @Param('id') id: number,
  ) {
    return this.parcelasService.findOne(clienteId, lancamentoId, +id);
  }

  @Patch(':id')
  update(
    @Param('clienteId') clienteId: number,
    @Param('lancamentoId') lancamentoId: number,
    @Param('id') id: string,
    @Body() updateParcelaDto: UpdateParcelaDto,
  ) {
    return this.parcelasService.update(
      clienteId,
      lancamentoId,
      +id,
      updateParcelaDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('clienteId') clienteId: number,
    @Param('lancamentoId') lancamentoId: number,
    @Param('id') id: string,
  ) {
    return this.parcelasService.remove(clienteId, lancamentoId, +id);
  }
}
