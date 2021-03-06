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
  Put,
  Query,
  Res,
  // UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

// @UsePipes(ValidationPipe)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffesService: CoffeesService) {}

  @Public()
  @Get('express')
  expressResp(@Res() response) {
    /**
     * @Res provides full controll over the response object, but there are disadvantages:
     * - lose compatability with Nest features which depend on Nest standard response handeling (interceptors and @HttpCode);
     * - lose compatability with Mock object
     */
    response.status(200).send(['this', 'is', 'express']);
  }

  @Put('recommend/:id')
  recommendCoffee(@Param('id') id: string): Promise<Coffee> {
    return this.coffesService.recommendCoffee(id);
  }

  /**
   * CRUD
   */
  // @UsePipes(ValidationPipe)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log('protocol', protocol);
    return this.coffesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Coffee> {
    return this.coffesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Coffee> {
    return this.coffesService.remove(id);
  }
}
