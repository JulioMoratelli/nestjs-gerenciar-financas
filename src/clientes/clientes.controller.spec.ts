import { EnderecosRepository } from './../enderecos/repositories/enderecos.repository';
import { ContaRepository } from './../contas/repositories/conta.repository';
import { EnderecosService } from './../enderecos/enderecos.service';
import { ClientesRepository } from './repositories/clientes.repository';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

describe('ClientesController', () => {
  let clienteController: ClientesController;
  let clientesService: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        ClientesService,
        PrismaService,
        ClientesRepository,
        EnderecosRepository,
        EnderecosService,
        ContaRepository,
      ],
    }).compile();

    clienteController = module.get<ClientesController>(ClientesController);
    clientesService = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(clienteController).toBeDefined();
    expect(clientesService).toBeDefined();
  });
});
