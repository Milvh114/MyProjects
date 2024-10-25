import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
