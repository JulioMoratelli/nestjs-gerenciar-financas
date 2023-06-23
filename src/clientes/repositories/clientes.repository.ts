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

  create(createClienteDto: CreateClienteDto): Promise<ClientesEntity> {
    const validarCpf = cpf.isValid(createClienteDto.cpf);
    const validarCnpj = cnpj.isValid(createClienteDto.cpf);

    if (!validarCpf && !validarCnpj) {
      throw new Error('cpf ou cnpj invalido');
    }

    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async findOne(id: number): Promise<ClientesExtendedEntity> {
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
  }

  async findAll(): Promise<ClientesExtendedEntity[]> {
    const clientes = await this.prisma.cliente.findMany();

    return clientes.map((cliente) => {
      const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
      return { ...cliente, nomeCompleto };
    });
  }

  async findAllComEndereco(): Promise<ClientesExtendedEntity[]> {
    const clientes = await this.prisma.cliente.findMany({
      where: {
        enderecos: {
          some: {}, // Verifica se há pelo menos um endereço relacionado
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

  async updateSaldo(id: number, saldo: number): Promise<ClientesEntity> {
    return this.prisma.cliente.update({
      where: {
        id,
      },
      data: saldo,
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
