import { EnderecosRepository } from './../enderecos/repositories/enderecos.repository';
import { ContaRepository } from './../contas/repositories/conta.repository';
import { EnderecosService } from './../enderecos/enderecos.service';
import { ClientesRepository } from './repositories/clientes.repository';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { vi } from 'vitest';
import { ClientesEntity } from './entities/cliente.entity';
import { EnderecoEntity } from './../enderecos/entities/endereco.entity';

const clientesEntityList: ClientesEntity[] = [
  new ClientesEntity({
    id: 1,
    cpf: '24021874844',
    email: 'a@a.com',
    nome: 'julio',
    sobrenome: 'morats',
  }),
];

describe('ClientesController', () => {
  let clienteController: ClientesController;
  let clientesService: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        PrismaService,
        ClientesRepository,
        EnderecosRepository,
        EnderecosService,
        ContaRepository,
        {
          provide: ClientesService,
          useValue: {
            findAllClienteEndereco: vi
              .fn()
              .mockResolvedValue(clientesEntityList), // Simulando o retorno dos clientes corretamente
          },
        },
      ],
    }).compile();

    clienteController = module.get<ClientesController>(ClientesController);
    clientesService = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(clienteController).toBeDefined();
    expect(clientesService).toBeDefined();
  });

  describe('find all', () => {
    it('deve retornar o clientes entity se possivel endereco entity', async () => {
      // act
      const result = await clienteController.findAllClienteEndereco();

      //assert
      expect(result).toEqual(
        clientesEntityList.map((cliente) => ({
          cliente,
          endereco: new EnderecoEntity(),
        })),
      );
    });
  });
});
