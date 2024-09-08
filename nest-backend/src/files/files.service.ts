import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class FilesService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const UPLOADS_DIR = this.configService.get('UPLOADS_DIR');
    if (UPLOADS_DIR && !fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
  }

  private slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'ąàáäâèéëêęìíïîòóöôùúüûñńçćłśżź·/_,:;';
    const to = 'aaaaaeeeeeiiiioooouuuunncclszz------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  private getExtensionOfMulterFile(file: Express.Multer.File) {
    return file.originalname.split('.').pop();
  }

  private getPathToFile(filenameWithExtension: string) {
    return `${this.configService.get('UPLOADS_DIR')}/${filenameWithExtension}`;
  }

  buildDishPhotoFilename(
    dishName: string,
    file: Express.Multer.File,
    groupId: number,
  ) {
    const filename = this.slugify(dishName);
    const extension = this.getExtensionOfMulterFile(file);
    return `${filename}-${groupId}-${Date.now()}.${extension}`;
  }

  savePhoto(file: Express.Multer.File, filenameWithExtension: string) {
    const filePath = this.getPathToFile(filenameWithExtension);
    const ws = fs.createWriteStream(filePath);
    ws.write(file.buffer);
  }

  getFile(filenameWithExtension: string) {
    const filePath = this.getPathToFile(filenameWithExtension);
    return fs.readFileSync(filePath);
  }

  deleteFile(filenameWithExtension: string) {
    const filePath = this.getPathToFile(filenameWithExtension);
    return fs.rmSync(filePath);
  }
}
