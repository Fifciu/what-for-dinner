import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('/:filename')
  async getFile(@Param('filename') filename: string, @Res() res) {
    const ext = filename.split('.').pop();
    // TODO: Probably it's not the greatest idea to use readFileSync on demand in requqest
    const file = this.filesService.getFile(filename);
    res.writeHead(200, { 'Content-Type': `image/${ext}` });
    res.end(file, 'Base64');
  }
}
