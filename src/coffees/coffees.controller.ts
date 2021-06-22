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
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
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
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    return await this.coffesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Coffee> {
    return await this.coffesService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return await this.coffesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return await this.coffesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Coffee> {
    return await this.coffesService.remove(id);
  }
}
