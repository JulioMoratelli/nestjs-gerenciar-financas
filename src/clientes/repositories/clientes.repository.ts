import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClientesEntity } from '../entities/cliente.entity';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto): Promise<ClientesEntity> {
    try {
      const validarCpf = cpf.isValid(createClienteDto.cpf);
      const validarCnpj = cnpj.isValid(createClienteDto.cpf);

      if (!validarCpf && !validarCnpj) {
        throw new Error('cpf ou cnpj invalido');
      }

      const cliente = this.prisma.cliente.create({
        data: createClienteDto,
      });
      return cliente;
    } catch (err) {}
  }

  async findOne(id: number): Promise<ClientesEntity> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: {
          id,
        },
        include: {
          enderecos: {
            where: {
              padrao: true,
            },
            select: {
              id: true,
              rua: true,
              bairro: true,
              numero: true,
              cidade: true,
            },
          },
        },
      });
      return cliente;
    } catch (err) {}
  }

  async findAllComEndereco(): Promise<ClientesEntity[]> {
    try {
      const clientes = await this.prisma.cliente.findMany({
        where: {
          enderecos: {
            some: {},
          },
        },
        include: {
          enderecos: {
            select: {
              id: true,
              rua: true,
              bairro: true,
              numero: true,
              cidade: true,
            },
          },
        },
      });
      return clientes;
    } catch (err) {}
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClientesEntity> {
    try {
      const cliente = this.prisma.cliente.update({
        where: {
          id,
        },
        data: updateClienteDto,
      });
      return cliente;
    } catch (err) {}
  }

  async updateSaldoCliente(
    id: number,
    saldoAtual: Decimal,
  ): Promise<ClientesEntity> {
    try {
      const cliente = this.prisma.cliente.update({
        where: {
          id,
        },
        data: {
          saldo: saldoAtual,
        },
      });
      return cliente;
    } catch (err) {}
  }

  async remove(id: number): Promise<ClientesEntity> {
    try {
      const cliente = this.prisma.cliente.delete({
        where: {
          id,
        },
      });
      return cliente;
    } catch (err) {}
  }
}
