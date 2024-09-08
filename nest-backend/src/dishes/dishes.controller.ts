import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

//https://docs.nestjs.com/techniques/file-upload
@Controller('dishes')
export class DishesController {
  constructor(
    private readonly dishesService: DishesService,
    private filesSerivce: FilesService,
  ) {}

  // TODO: I shouldn't keep file in memory
  @Post()
  @UseInterceptors(FileInterceptor('photoSrc'))
  async create(
    @Body() createDishDto: CreateDishDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const groupId = 1;
    const filename = this.filesSerivce.buildDishPhotoFilename(
      createDishDto.name,
      file,
      groupId,
    );
    await this.filesSerivce.savePhoto(file, filename);
    return this.dishesService.create({
      ...createDishDto,
      photoSrc: filename,
      groupId,
    });
  }

  @Get(':groupId')
  async findByGroupId(@Param('groupId', ParseIntPipe) groupId: number) {
    return (await this.dishesService.findByGroupId(groupId)).map((dish) => ({
      ...dish,
      photoSrc: dish.photoSrc ? `/api/files/${dish.photoSrc}` : '',
    }));
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dishesService.findOne(+id);
  // }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photoSrc'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDishDto: UpdateDishDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (!updateDishDto.name && !file) {
      throw new HttpException('Nothing to update', HttpStatus.BAD_REQUEST);
    }
    const dish = await this.dishesService.findOne(id);
    if (!dish) {
      throw new HttpException('Dish not found', HttpStatus.NOT_FOUND);
    }
    let filename;
    const groupId = 1;
    if (file) {
      const name = updateDishDto?.name || dish.name;
      filename = this.filesSerivce.buildDishPhotoFilename(name, file, groupId);
      await Promise.all([
        this.filesSerivce.savePhoto(file, filename),
        this.filesSerivce.deleteFile(dish.photoSrc),
      ]);
    }

    return this.dishesService.update(id, {
      ...updateDishDto,
      ...(filename ? { photoSrc: filename } : {}),
    });
  }

  @Delete(':dishId')
  async remove(@Param('dishId', ParseIntPipe) dishId: number) {
    const dish = await this.dishesService.delete(+dishId);
    this.filesSerivce.deleteFile(dish.photoSrc); // TODO: Maybe it should be transactional
    return dish;
  }
}
