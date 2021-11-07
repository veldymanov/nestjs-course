import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          database: process.env.DB_NAME,
          username: process.env.DB_USER,
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          password: process.env.DB_PASSWORD,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo('Create [POST /]');
  // it.todo('Get All [Get /]', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .set('Authorization', process.env.API_KEY)
  //     .expect(200)
  //     .expect('Hello Nest 1313!');
  // });
  it.todo('Get one [Get /:id]');
  it.todo('Update one [Patch /:id]');
  it.todo('Delete one [DELETE /:id]');
});
