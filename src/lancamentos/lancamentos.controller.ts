import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';

@Controller('lancamentos')
export class LancamentosController {
  constructor(private readonly lancamentosService: LancamentosService) {}

  @Post()
  create(@Body() createLancamentoDto: CreateLancamentoDto) {
    return this.lancamentosService.create(createLancamentoDto);
  }

  @Get()
  findAll() {
    return this.lancamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lancamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLancamentoDto: UpdateLancamentoDto) {
    return this.lancamentosService.update(+id, updateLancamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lancamentosService.remove(+id);
  }
}
