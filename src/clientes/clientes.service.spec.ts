import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientesEntity } from './entities/cliente.entity';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ClientesService', () => {
  let clienteService: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(ClientesEntity),
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findAllComEndereco: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            ClientesService,
          },
        },
      ],
    }).compile();

    clienteService = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(clienteService).toBeDefined();
  });

  // describe('findOne', () => {
  //   it('chupa cabra', async () => {});
  // });
});
