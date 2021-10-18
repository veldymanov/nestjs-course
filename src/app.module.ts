import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { EventsModule } from './events/events.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env', // default
      validationSchema: Joi.object({
        SERVER_PORT: Joi.number().default(3000),
        DB_NAME: Joi.required(),
        DB_USER: Joi.required(),
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_PASSWORD: Joi.required(),
      }),
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      host: process.env.DB_HOST, // without docker 'localhost'
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD, // like in docker-compose.yml
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
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
