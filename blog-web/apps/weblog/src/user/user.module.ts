import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
