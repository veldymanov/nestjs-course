import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['Vanilla', 'Chocolate'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === +id);

    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(updateCoffeDto: CreateCoffeeDto): Coffee {
    const coffeeId = this.coffees.length + 1;
    this.coffees.push({ ...updateCoffeDto, id: coffeeId });
    return this.coffees.find((coffee) => coffee.id === coffeeId);
  }

  update(id: string, updateCoffeDto: any): Coffee {
    console.log(updateCoffeDto instanceof UpdateCoffeeDto);
    // const existingCoffee = this.findOne(id);
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);

    if (coffeeIndex >= 0) {
      if (updateCoffeDto.name) {
        this.coffees[coffeeIndex].name = updateCoffeDto.name;
      }

      if (updateCoffeDto.brand) {
        this.coffees[coffeeIndex].brand = updateCoffeDto.brand;
      }

      if (updateCoffeDto.flavors) {
        this.coffees[coffeeIndex].flavors = updateCoffeDto.flavors;
      }

      return this.coffees[coffeeIndex];
    }
  }

  remove(id: string): Coffee[] {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);

    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1);
    }
  }
}
