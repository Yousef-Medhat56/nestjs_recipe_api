import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Igredient, Recipe } from './recipe/entity/recipe';
import { validate } from './config/env.validation';


@Module({
  imports: [
    ConfigModule.forRoot({validate}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME,
      entities: [Recipe,Igredient],
      synchronize: true,
      logging:true
    }),
    RecipeModule],
  controllers: [],
  providers: [],
})

export class AppModule {}