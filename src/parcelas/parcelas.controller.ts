import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('parcelas')
export class ParcelasController {
  constructor(
    private readonly parcelasService: ParcelasService,
    private prisma: PrismaService,
  ) {}

  @Get(':clienteId')
  findAll(clienteId: number) {
    return this.parcelasService.findAll(clienteId);
  }

  @Get(':clienteId/:id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.parcelasService.findOne(clienteId, id);
  }

  @Patch(':clienteId/:lancamentoId/:id')
  async update(
    @Param('clienteId') clienteId: number,
    @Param('lancamentoId') lancamentoId: number,
    @Param('id') id: string,
    @Body() updateParcelaDto: UpdateParcelaDto,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return this.parcelasService.update(
          clienteId,
          lancamentoId,
          +id,
          updateParcelaDto,
        );
      });
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async remove() {
    try {
      return await this.prisma.$transaction(async () => {
        return this.parcelasService.remove();
      });
    } catch (err) {}
  }
}
