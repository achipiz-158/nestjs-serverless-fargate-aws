import { Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import { CommentService } from '../services/comment.service';
import { Query } from '@nestjs/graphql';
import { Comment } from './../entities/comment.entity';
import { CreateCommentInput } from '../dto/publication/create-comment-input';
import { UseGuards } from '@nestjs/common';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  comments() {
    return this.commentService.findAll();
  }

  @Query(() => [Comment])
  commentByIdPublication(@Args('publication_id') publication_id: string) {
    return this.commentService.findByIdPublication(publication_id);
  }

  @Query(() => Comment)
  commentByIdComment(@Args('comment_id') comment_id: string) {
    return this.commentService.findByIdComment(comment_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async createComment(
    @Args('commentInput') commentInput: CreateCommentInput,
    @Context() ctx,
  ) {
    try {
      const profile_id = ctx.req.user.sub;
      await this.commentService.addComment(commentInput, profile_id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
