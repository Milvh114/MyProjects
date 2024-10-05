import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseTypeOrmModule } from '@app/database-type-orm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    DatabaseTypeOrmModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
