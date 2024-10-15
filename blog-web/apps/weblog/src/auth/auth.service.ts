import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/index';
import User from '@app/database-type-orm/entities/User';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async signup(authDto: AuthDto): Promise<object> {
    try {
      // generate pass to hashpass
      const hash = await argon2.hash(authDto.password);
      console.log(authDto);
      //save the new user in the db
      authDto.password = hash;
      const user = await this.userService.createUser(authDto);
      console.log(user);
      // return this.signToken(user.id, user.email);
      return user;
    } catch (error) {
      throw error;
    }
    return {};
  }

  async signin(authDto: AuthDto): Promise<object> {
    //find you by email
    const user = await this.userService.findByEmail(authDto.email);

    //compare password
    const passMatches = await argon2.verify(user.pass, authDto.password);

    //if pass incorrect throw exception
    if (!passMatches) {
      throw new ForbiddenException('password not correct');
    }
    return this.signToken(user.id, user.email, user.isSuperAdmin);
  }

  // eslint-disable-next-line prettier/prettier
  async signToken(userId:number, email: string, isSuperAdmin: number): Promise<{access_token: string}> {
    const payload = {
      sub: userId,
      email,
      isSuperAdmin,
    };
    const secret = await this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });
    return { access_token: token };
  }
}
