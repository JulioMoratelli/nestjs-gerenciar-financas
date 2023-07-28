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
import { ClienteComEnderecoDto } from './dto/clienteEndereco.dto';

const clientesEntityList: ClientesEntity[] = [
  new ClientesEntity({
    dataCriado: new Date(),
    dataAlterado: new Date(),
    id: 1,
    email: 'string',
    cpf: '240121874844',
    nome: 'string',
    sobrenome: 'string',
    enderecos: [
      {
        rua: 'string',
        numero: 123,
        bairro: 'string',
        complemento: 'string',
        cidade: 'string',
        cep: 123,
      },
    ],
  }),
];

const novoCliente = new ClientesEntity({
  email: 'string',
  cpf: 'string',
  nome: 'string',
  sobrenome: 'string',
  enderecos: [
    {
      rua: 'string',
      numero: 123,
      bairro: 'string',
      complemento: 'string',
      cidade: 'string',
      cep: 123,
    },
  ],
});

describe('ClientesController', () => {
  let clienteController: ClientesController;
  let clientesService: ClientesService;
  let prisma: PrismaService;

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
              .mockResolvedValue(clientesEntityList),
            createClienteComEndereco: vi.fn().mockResolvedValue(novoCliente),
            findOne: vi.fn().mockResolvedValue(clientesEntityList[0]),
          },
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    clientesService = module.get<ClientesService>(ClientesService);
    clienteController = new ClientesController(clientesService, prisma);
  });

  it('should be defined', () => {
    expect(clienteController).toBeDefined();
    expect(clientesService).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('find all', () => {
    it('deve retornar o clientes entity', async () => {
      // act
      const result = await clienteController.findAllClienteEndereco();
      const clientesEntities = result.map(
        (result) => new ClientesEntity(result),
      );

      //assert
      expect(clientesEntities).toEqual(clientesEntityList);
    });

    it('test com erro', () => {
      vi.spyOn(clientesService, 'findAllClienteEndereco').mockRejectedValueOnce(
        new Error(),
      );

      expect(clienteController.findAllClienteEndereco()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('novo cliente criado com sucesso', async () => {
      //arrange
      const body: ClienteComEnderecoDto = {
        email: 'string@g.com',
        cpf: '24021874844',
        nome: 'string',
        sobrenome: 'string',
        rua: 'string',
        numero: 123,
        bairro: 'string',
        complemento: 'string',
        cidade: 'string',
        cep: 123,
      };

      //act
      const result = await clienteController.createClienteComEndereco(body);

      //assert
      expect(result).toEqual(novoCliente);
    });
  });

  describe('findOne', () => {
    it('Cliente mostrado com sucesso', async () => {
      //Act
      const result = await clienteController.findOne(1);

      //Assert
      expect(result).toEqual(clientesEntityList[0]);
      expect(clientesService.findOne).toHaveBeenCalledTimes(1);
      expect(clientesService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
