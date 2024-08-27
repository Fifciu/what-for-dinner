import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Yser with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: userData,
    });
    return newUser;
  }
}
