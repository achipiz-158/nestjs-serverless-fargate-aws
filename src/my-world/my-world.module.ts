import { Module } from '@nestjs/common';
import { Media, Publication, Tag } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './services/media.service';
import { PublicationService } from './services/publication.service';
import { PublicationResolver } from './resolvers/publication.resolver';
import { Follow, Profile } from 'src/profile/entities';
import { ProfileModule } from 'src/profile/profile.module';
import { LikePublication } from './entities/like-publication.entity';
import { S3Service } from 'src/aws/services/s3.service';
import { FilesPublicationController } from './controllers/files.controller';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentService } from './services/comment.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Media,
      Profile,
      Publication,
      LikePublication,
      Comment,
      Follow,
      Tag,
    ]),
    ProfileModule,
  ],
  providers: [
    MediaService,
    PublicationService,
    PublicationResolver,
    S3Service,
    CommentService,
    CommentResolver,
  ],
  controllers: [FilesPublicationController],
})
export class MyWorldModule {}
