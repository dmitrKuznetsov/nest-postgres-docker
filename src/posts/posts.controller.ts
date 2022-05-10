import { PostsService } from './posts.service';
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private postsService : PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto,
            @UploadedFile() image) {
    return this.postsService.create(dto, image)
  }
}
