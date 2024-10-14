import { Module } from '@nestjs/common';
<<<<<<< HEAD:blog-web/apps/weblog/src/weblog.module.ts
import { weblogController } from './weblog.controller';
import { weblogService } from './weblog.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseTypeOrmModule } from '@app/database-type-orm';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    DatabaseTypeOrmModule,
    BlogModule,
  ],
  controllers: [weblogController],
  providers: [weblogService],
=======
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService],
>>>>>>> parent of 6b5f636 (add sign-in and sign-up feature):blog-web/apps/blog/src/blog.module.ts
})
export class weblogModule {}
