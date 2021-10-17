import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { EventsModule } from './events/events.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_container', // without docker 'localhost'
      port: 5432,
      username: 'postgres',
      password: 'pass123', // like in docker-compose.yml
      database: 'postgres',
      // loads module automatically
      autoLoadEntities: true,
      /*
        Ensures that typeorm entoties will be synced with the DB every time we run the app.
        Automatically generate SQL table from all calsses with the entity decorator and metadata they contain.
        For development only!
      **/
      synchronize: true,
    }),
    EventsModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
