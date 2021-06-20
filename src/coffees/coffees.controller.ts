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
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
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
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffesService.remove(id);
  }
}
