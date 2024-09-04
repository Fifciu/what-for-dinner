import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [DbModule, ConfigModule, FilesModule],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
