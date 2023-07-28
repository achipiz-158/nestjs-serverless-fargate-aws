import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentInput } from '../dto/publication/create-comment-input';
import { ProfileService } from 'src/profile/services';

@Injectable()
export class CommentService {
  private readonly commentRelations = [
    'publication',
    'profile',
    'profile.country',
  ];
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly profileService: ProfileService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findByIdPublication(pub_id: string): Promise<Comment[]> {
    let foundComments = await this.commentRepository.find({
      where: {
        publication: {
          id: pub_id,
        },
      },
      relations: this.commentRelations,
    });
    foundComments = foundComments.map((comment) => {
      comment.numComments = foundComments.length;
      return comment;
    });

    return foundComments;
  }

  async findByIdComment(com_id: string): Promise<Comment[]> {
    const foundComments = await this.commentRepository.find({
      where: { publication: { id: com_id } },
      relations: this.commentRelations,
    });
    return foundComments;
  }

  async addComment(
    comment: CreateCommentInput,
    profile_id: string,
  ): Promise<Comment> {
    const newComment = this.commentRepository.create(comment);
    const proId = await this.profileService.findOneById(profile_id);
    newComment.profile = proId;
    const commentSave = await this.commentRepository.save(newComment);
    return commentSave;
  }
}
