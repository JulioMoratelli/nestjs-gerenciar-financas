import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClientesEntity } from '../entities/cliente.entity';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createClienteDto: CreateClienteDto): Promise<ClientesEntity> {
    const validandoCpfCnpj = cpf.isValid(createClienteDto.cpf);

    if (!validandoCpfCnpj) {
      throw new Error('cpf ou cnpj invalido');
    }

    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  findOne(id: number): Promise<ClientesEntity> {
    return this.prisma.cliente.findUnique({
      where: {
        id,
      },
      include: {
        enderecos: {
          where: {
            padrao: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<ClientesEntity[]> {
    return await this.prisma.cliente.findMany();
  }

  update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClientesEntity> {
    return this.prisma.cliente.update({
      where: {
        id,
      },
      data: updateClienteDto,
    });
  }

  remove(id: number): Promise<ClientesEntity> {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }
}
