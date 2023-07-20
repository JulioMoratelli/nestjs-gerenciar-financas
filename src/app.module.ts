import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ContasModule } from './contas/contas.module';
import { CreditosModule } from './creditos/creditos.module';
import { PrismaService } from './prisma/prisma.service';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { ParcelasModule } from './parcelas/parcelas.module';
import { IsCpfCnpjConstraint } from 'decoradores/cpfcnpj.decorador';
import { ValidandoExistenciaCliente } from './middleware/vierificarExistencia.middleware';

@Module({
  imports: [
    ClientesModule,
    EnderecosModule,
    ContasModule,
    CreditosModule,
    LancamentosModule,
    ParcelasModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, IsCpfCnpjConstraint],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidandoExistenciaCliente)
      .exclude({ path: 'clientes', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
