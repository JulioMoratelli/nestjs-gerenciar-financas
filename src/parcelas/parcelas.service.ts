import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';

@Injectable()
export class ParcelasService {
  constructor(private readonly repository: ParcelasRepository) {}

  create(createParcelaDto: CreateParcelaDto) {
    return this.repository.create(createParcelaDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateParcelaDto: UpdateParcelaDto) {
    return this.repository.update(id, updateParcelaDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
