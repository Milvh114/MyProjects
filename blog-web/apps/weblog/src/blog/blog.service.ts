import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import Blog from '@app/database-type-orm/entities/Blog';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDto } from './dto/index';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
require('dotenv').config();


@Injectable()
export class BlogService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
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

  async findOne(id: number): Promise<Blog | null> {
    const result = await this.blogRepo.findOne({
      where: { id },
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

  async upload(fileOriginalName: string, fileMimeType: string, file: Buffer): Promise<string> {

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'weblog-app',
          Key: fileOriginalName,
          Body: file,
          ContentType: fileMimeType,
        })
      )
      return `This action removes a #${file} blog`;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  entityToAuthDto(blog: Blog) {
    const blogDto = new BlogDto();
    blogDto.content = blog.content;
    blogDto.name = blog.name;
    return blogDto;
  }
}
