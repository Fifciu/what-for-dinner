import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  create(createDishDto: CreateDishDto) {
    return 'This action adds a new dish';
  }

  async findByGroupId(groupId: number) {
    return await this.prisma.dish.findMany({ where: { groupId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
