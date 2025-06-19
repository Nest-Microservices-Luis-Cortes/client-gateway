import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NastsModule } from './transports/nasts.module';

@Module({
  imports: [ProductsModule, OrdersModule, NastsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
