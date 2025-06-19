import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { envs, NATS_SERVICE} from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NastsModule } from 'src/transports/nasts.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [/* ClientsModule.register([

    {
      name: NATS_SERVICE,
      transport: Transport.NATS,
      options: {
       servers: envs.natsServers
      }
    },

  ]) */ NastsModule],
})
export class ProductsModule { }
