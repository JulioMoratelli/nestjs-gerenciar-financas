import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { UpdateParcelaDto } from './dto/update-parcela.dto';

@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  @Get(':clienteId')
  findAll(clienteId: number) {
    return this.parcelasService.findAll(clienteId);
  }

  @Get(':clienteId/:id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.parcelasService.findOne(clienteId, id);
  }

  @Patch(':clienteId/:lancamentoId/:id')
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
  remove() {
    return this.parcelasService.remove();
  }
}
