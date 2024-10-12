import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/index';
import { AuthUser } from '../auth/decorators/user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
// import { User } from '@app/authorization/user.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBlogDto: BlogDto) {
    const id = 1
    console.log("abc")
    return this.blogService.createBlog(createBlogDto, id);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: BlogDto) {
    return this.blogService.update(+id, updateBlogDto, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
