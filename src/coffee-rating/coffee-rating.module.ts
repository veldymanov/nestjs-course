import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
// import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    // DatabaseModule.register({
    //   type: 'postgres',
    //   host: 'postgres_container', // without docker 'localhost'
    //   port: 5432,
    //   password: 'pass123', // like in docker-compose.yml
    // }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
