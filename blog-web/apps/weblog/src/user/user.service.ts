import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { AuthDto } from '../auth/dto';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(authDto: AuthDto): Promise<UserDto> {
    //check user exit
    let user = await this.userRepo.findOne({
      where: {
        email: authDto.email,
      },
    });
    //throw error
    if (user) {
      throw new ForbiddenException('email already exist');
    }
    //if not create new one
    user = await this.userRepo.create({
      email: authDto.email,
      password: authDto.password,
      name: authDto.name,
      isSuperAdmin: authDto.isSuperAdmin,
    });

    await this.userRepo.save(user);
    return this.entityToAuthDto(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException('email not exist');
    }
    return this.entityToAuthDto(user);
  }

  entityToAuthDto(user: User) {
    const userDto = new UserDto();
    userDto.email = user.email;
    userDto.name = user.name;
    userDto.id = user.id;
    userDto.pass = user.password;
    userDto.isSuperAdmin = user.isSuperAdmin;
    return userDto;
  }
}
