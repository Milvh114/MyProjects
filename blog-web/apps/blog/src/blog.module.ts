import { Module } from '@nestjs/common';
<<<<<<< HEAD:blog-web/apps/weblog/src/weblog.module.ts
<<<<<<< HEAD:blog-web/apps/weblog/src/weblog.module.ts
import { weblogController } from './weblog.controller';
import { weblogService } from './weblog.service';
=======
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
>>>>>>> parent of 8b8a788 (add blog feature):blog-web/apps/blog/src/blog.module.ts
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
<<<<<<< HEAD:blog-web/apps/weblog/src/weblog.module.ts
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
=======
  controllers: [BlogController],
  providers: [BlogService],
>>>>>>> parent of 8b8a788 (add blog feature):blog-web/apps/blog/src/blog.module.ts
})
export class BlogModule {}
