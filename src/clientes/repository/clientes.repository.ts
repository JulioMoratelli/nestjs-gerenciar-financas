import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClientesEntity } from '../entities/cliente.entity';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createClienteDto: CreateClienteDto): Promise<ClientesEntity> {
    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  findOne(id: number): Promise<ClientesEntity> {
    return this.prisma.cliente.findUnique({
      where: {
        id,
      },
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

  remove(id: number): Promise<ClientesEntity> {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }
}
