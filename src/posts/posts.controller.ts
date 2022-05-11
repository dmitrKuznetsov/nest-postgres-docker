import { PostsService } from './posts.service';
import { Controller, Post, Body, UploadedFile, UseInterceptors, HttpStatus, UsePipes } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostModel } from './posts.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private postsService : PostsService) {}

  @ApiOperation({summary: 'Add post with image'})
  @ApiResponse({status: HttpStatus.CREATED, type: PostModel})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Image is missing' })
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'A post with this title already exists' })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@UploadedFile() image, @Body() dto: CreatePostDto ) {
    return this.postsService.create(dto, image)
  }
}
