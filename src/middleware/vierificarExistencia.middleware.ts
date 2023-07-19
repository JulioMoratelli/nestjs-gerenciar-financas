import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidandoExistenciaCliente implements NestMiddleware {
  // use(req: Request, res: Response, next: NextFunction) {
  //   console.log('Request...');
  //   next();
  // }

  private readonly prisma = new PrismaClient();

  async use(req: Request, res: Response, next: NextFunction) {
    const clienteId = req.header('clienteId');

    if (!clienteId) {
      return res.status(403).json({ error: 'Cliente não encontrado' });
    }

    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id: Number(clienteId) },
      });

      if (!cliente) {
        return res.status(403).json({ error: 'Cliente não encontrato' });
      }

      next();
    } catch (error) {
      console.error('Erro ao verificar o cliente no banco de dados:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}
