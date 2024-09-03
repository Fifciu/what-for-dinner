import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
