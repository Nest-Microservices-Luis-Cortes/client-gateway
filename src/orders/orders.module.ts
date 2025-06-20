import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, ORDER_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [ClientsModule.register([
  
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
         servers: envs.natsServers
        }
      },
  
    ]),],
})
export class OrdersModule {}
