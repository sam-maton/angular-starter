import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import type { DrizzleDb } from '../../db/client';
import { posts } from '../../db/schema';

@Injectable()
export class PostsService {
  constructor(@Inject('DRIZZLE') private readonly db: DrizzleDb) {}

  create(createPostDto: CreatePostDto) {
    return this.db.insert(posts).values(createPostDto).run();
  }

  findAll() {
    return this.db.select().from(posts);
  }
}
