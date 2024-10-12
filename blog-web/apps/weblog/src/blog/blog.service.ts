import { ForbiddenException, Injectable } from '@nestjs/common';
import Blog from '@app/database-type-orm/entities/Blog';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDto } from './dto/index';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
  ) {}

  async createBlog(blogDto: BlogDto, userId: number): Promise<BlogDto> {
    const blog = await this.blogRepo.create({
      name: blogDto.name,
      content: blogDto.content,
      userId: userId,
    });
    await this.blogRepo.save(blog);
    return this.entityToAuthDto(blog);
  }

  findAll() {
    return `This action returns all blog`;
  }

  async findOne(id: number, userId: number): Promise<Blog | null> {
    const result = await this.blogRepo.findOne({
      where: { id, userId },
    });
    return result;
  }

  async update(id: number, updateBlogDto: BlogDto, userId: number) {
    const result = await this.blogRepo.update(
      {
        id,
        userId,
      },
      {
        name: updateBlogDto.content,
        content: updateBlogDto.content,
      },
    );
    console.log(result);
    // return result;
    return `This action updates a #${id} blog`;
  }

  async remove(id: number) {
    const blog = await this.blogRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!blog) {
      throw new ForbiddenException('blog not exist');
    }
    this.blogRepo.remove(blog);
    return `This action removes a #${id} blog`;
  }

  entityToAuthDto(blog: Blog) {
    const blogDto = new BlogDto();
    blogDto.content = blog.content;
    blogDto.name = blog.name;
    return blogDto;
  }
}
