import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send({ cmd: 'find_all_orders' }, paginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_orders' },
      {
        ...paginationDto,
        status: statusDto.status
      }).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    console.log('changeStatus', id, statusDto);
    return this.client.send({ cmd: 'change_order_status' }, { id, status: statusDto.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
