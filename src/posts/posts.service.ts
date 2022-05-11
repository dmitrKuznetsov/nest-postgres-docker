import { HttpException } from '@nestjs/common';
import { FilesService } from './../files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {

  constructor(@InjectModel(PostModel) private postRepository: typeof PostModel,
              private filesService : FilesService) {}

  async create(dto: CreatePostDto, image: any) {
    const existingPost = await this.postRepository.findOne({where: {title: dto.title}})
    if (existingPost) {
      throw new HttpException(`A post with this title already exists`, HttpStatus.BAD_REQUEST)
    }

    if (!image) {
      throw new HttpException(`Image is missing`, HttpStatus.BAD_REQUEST)
    }

    const fileName = await this.filesService.createFile(image)
    const post = await this.postRepository.create({...dto, image: fileName})
    return post
  }
}
