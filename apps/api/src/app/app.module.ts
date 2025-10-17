import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../db/database.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '../lib/auth';

@Module({
  imports: [DatabaseModule, PostsModule, AuthModule.forRoot({ auth })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
