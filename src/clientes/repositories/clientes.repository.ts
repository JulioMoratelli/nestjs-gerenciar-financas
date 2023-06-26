import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClientesEntity } from '../entities/cliente.entity';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { Decimal } from '@prisma/client/runtime';

export interface ClientesExtendedEntity extends ClientesEntity {
  nomeCompleto: string;
  saldo: Decimal;
}

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

  async findOne(id: number): Promise<ClientesExtendedEntity> {
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

      if (cliente) {
        const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
        return { ...cliente, nomeCompleto };
      }
      return null;
    } catch (err) {}
  }

  async findAll(): Promise<ClientesExtendedEntity[]> {
    try {
      const clientes = await this.prisma.cliente.findMany();
      return clientes.map((cliente) => {
        const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
        return { ...cliente, nomeCompleto };
      });
    } catch (err) {}
  }

  async findAllComEndereco(): Promise<ClientesExtendedEntity[]> {
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

      return clientes.map((cliente) => {
        const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
        return { ...cliente, nomeCompleto };
      });
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

  async updateSaldo(id: number, saldoAtual: Decimal): Promise<ClientesEntity> {
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
