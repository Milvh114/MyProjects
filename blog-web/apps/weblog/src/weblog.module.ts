import { Module } from '@nestjs/common';
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
})
export class weblogModule {}
