import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/index';
import { IsAdmin } from '../auth/decorators/isAdmin.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
// import { User } from '@app/authorization/user.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AdminGuard)
  @IsAdmin(1)
  @Post()
  create(@Body() createBlogDto: BlogDto, @Req() req) {
    return this.blogService.createBlog(createBlogDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @IsAdmin(1)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: BlogDto) {
    return this.blogService.update(+id, updateBlogDto, +id);
  }

  @UseGuards(AdminGuard)
  @IsAdmin(1)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }

  // @UseGuards(AdminGuard)
  // @IsAdmin(1)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        // new MaxFileSizeValidator({ maxSize: 10000 }),
        // new FileTypeValidator({ fileType: 'image/jpeg'}),
      ]
    })
  ) file: Express.Multer.File) {
    console.log('File: ', file);
    return this.blogService.upload(file.fieldname, file.mimetype, file.buffer);
  }
}
