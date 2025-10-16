import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../db/database.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DatabaseModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
