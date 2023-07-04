import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { CreateParcelaDto } from 'src/parcelas/dto/create-parcela.dto';
import { ParcelasRepository } from 'src/parcelas/repositories/parcelas.repository';

@Controller('lancamentos')
export class LancamentosController {
  constructor(
    private readonly lancamentosService: LancamentosService,
    private parcelasRepository: ParcelasRepository,
  ) {}

  @Post()
  create(
    @Body() createLancamentoDto: CreateLancamentoDto,
    @Body() createParcelaDto: CreateParcelaDto,
  ) {
    return this.lancamentosService.create(
      createLancamentoDto,
      createParcelaDto,
    );
  }

  @Get()
  findAll(@Param('clienteId') clienteId: number) {
    return this.lancamentosService.findAll(clienteId);
  }

  @Get(':id')
  findOne(@Param('clienteId') clienteId: number, @Param('id') id: number) {
    return this.lancamentosService.findOne(+id, clienteId);
  }

  @Patch(':id')
  update(
    @Param('clienteId') clienteId: number,
    @Param('id') id: string,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    return this.lancamentosService.update(clienteId, +id, updateLancamentoDto);
  }

  @Delete(':id')
  remove(@Param('clienteId') clienteId: number, @Param('id') id: string) {
    return this.lancamentosService.remove(+id, clienteId);
  }
}
