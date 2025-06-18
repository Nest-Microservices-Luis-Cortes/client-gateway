import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { log } from 'console';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send({ cmd: 'find_all_orders' }, paginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send({ cmd: 'find_all_orders' },
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
    return this.ordersClient.send({ cmd: 'change_order_status' }, { id, status: statusDto.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
