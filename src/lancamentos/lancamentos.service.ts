import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';

@Injectable()
export class LancamentosService {
  create(createLancamentoDto: CreateLancamentoDto) {
    return 'This action adds a new lancamento';
  }

  findAll() {
    return `This action returns all lancamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lancamento`;
  }

  update(id: number, updateLancamentoDto: UpdateLancamentoDto) {
    return `This action updates a #${id} lancamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} lancamento`;
  }
}
