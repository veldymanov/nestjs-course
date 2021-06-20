import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffesService: CoffeesService) {}

  @Get('express')
  expressResp(@Res() response) {
    response.status(200).send(['this', 'is', 'express']);
  }

  @Get()
  findAll(@Query() paginationQuery): Coffee[] {
    // const { limit, offset } = paginationQuery;
    return this.coffesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Coffee {
    return this.coffesService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() body) {
    return this.coffesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffesService.remove(id);
  }
}
