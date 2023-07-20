import { ExtendedRequest } from './../middleware/extended-request.interface';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('parcelas')
export class ParcelasController {
  constructor(
    private readonly parcelasService: ParcelasService,
    private prisma: PrismaService,
  ) {}

  @Get()
  findAll(@Req() request: ExtendedRequest) {
    const clienteId = request.clienteId;

    return this.parcelasService.findAll(clienteId);
  }

  @Get(':id')
  findOne(@Req() request: ExtendedRequest, @Param('id') id: number) {
    const clienteId = request.clienteId;

    return this.parcelasService.findOne(clienteId, id);
  }

  @Patch(':id')
  async update(
    @Req() request: ExtendedRequest,
    @Param('lancamentoId') lancamentoId: number,
    @Param('id') id: string,
    @Body() updateParcelaDto: UpdateParcelaDto,
  ) {
    const clienteId = request.clienteId;

    return await this.prisma.$transaction(async (trx) => {
      return this.parcelasService.update(
        clienteId,
        lancamentoId,
        +id,
        updateParcelaDto,
        trx,
      );
    });
  }

  @Delete(':id')
  async remove() {
    return await this.prisma.$transaction(async () => {
      return this.parcelasService.remove();
    });
  }
}
