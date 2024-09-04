import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @Get(':groupId')
  findByGroupId(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.dishesService.findByGroupId(groupId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dishesService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(+id, updateDishDto);
  }

  @Delete(':dishId')
  remove(@Param('dishId', ParseIntPipe) dishId: number) {
    return this.dishesService.delete(+dishId);
  }
}
