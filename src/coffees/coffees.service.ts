import {
  Inject,
  // HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import {
  COFFEE_BRANDS,
  COFFEE_BRANDS_FACTORY,
  COFFEE_BRANDS_FACTORY_ASYNC,
} from './coffees.constants';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    @Inject(COFFEE_BRANDS_FACTORY) coffeeBrandsFactory: string[],
    @Inject(COFFEE_BRANDS_FACTORY_ASYNC) coffeeBrandsFactoryAsync: string[],
    private readonly configService: ConfigService,
  ) {
    console.log('coffeeBrands', coffeeBrands);
    console.log('coffeeBrandsFactory', coffeeBrandsFactory);
    console.log('coffeeBrandsFactoryAsync', coffeeBrandsFactoryAsync);

    const databaseHost = configService.get<string>('DB_HOST', 'localhost');
    console.log('databaseHost ', databaseHost);
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });

    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = await this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavors =
      updateCoffeDto.flavors &&
      (await Promise.all(
        updateCoffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      ...updateCoffeDto,
      id: +id,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(id: string): Promise<void> {
    const coffee = await this.findOne(id);

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
