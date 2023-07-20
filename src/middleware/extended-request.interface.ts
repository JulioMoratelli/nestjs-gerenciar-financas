import { Request } from 'express';

export interface ExtendedRequest extends Request {
  // clienteId não pode ser opcional
  clienteId: number;
}
