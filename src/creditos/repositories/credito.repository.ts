// import { Injectable } from '@nestjs/common';
// import { CreateContaDto } from 'src/contas/dto/create-conta.dto';
// import { UpdateContaDto } from 'src/contas/dto/update-conta.dto';
// import { ContaEntity } from 'src/contas/entities/conta.entity';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ContaRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   private async pertence(clienteId: number, id: number): Promise<void> {
//     const verificandoExistencia = await this.prisma.conta.findUnique({
//       where: {
//         clienteId,
//         id,
//       },
//     });

//     if (
//       !verificandoExistencia ||
//       verificandoExistencia.clienteId !== clienteId
//     ) {
//       throw new Error('A conta não existe ou não pertence ao clienteId');
//     }
//   }

//   async create(createContaDto: CreateContaDto): Promise<ContaEntity> {
//     return this.prisma.conta.create({
//       data: createContaDto,
//     });
//   }

//   async findAll(clienteId: number): Promise<ContaEntity[]> {
//     return await this.prisma.conta.findMany({
//       where: {
//         clienteId,
//       },
//     });
//   }

//   async findOne(clienteId: number, id: number): Promise<ContaEntity> {
//     await this.pertence(clienteId, id);
//     return this.prisma.conta.findUnique({
//       where: {
//         id,
//         clienteId,
//       },
//     });
//   }

//   async update(
//     clienteId: number,
//     id: number,
//     updateContaDto: UpdateContaDto,
//   ): Promise<ContaEntity> {
//     await this.pertence(clienteId, id);
//     return await this.prisma.conta.update({
//       where: {
//         clienteId,
//         id,
//       },
//       data: updateContaDto,
//     });
//   }

//   async remove(clienteId: number, id: number): Promise<ContaEntity> {
//     await this.pertence(clienteId, id);
//     return this.prisma.conta.delete({
//       where: {
//         clienteId,
//         id,
//       },
//     });
//   }
// }
