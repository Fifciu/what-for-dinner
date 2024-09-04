import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/db/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DishesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createDishDto: CreateDishDto & { photoSrc: string }) {
    return await this.prisma.dish.create({ data: createDishDto });
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

  async delete(id: number) {
    return await this.prisma.dish.delete({ where: { id } });
  }
}
