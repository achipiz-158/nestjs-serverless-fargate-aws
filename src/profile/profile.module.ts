import { Module } from '@nestjs/common';
import { ProfileResolver } from './resolvers/profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplementaryModule } from 'src/complementary/complementary.module';
import {
  Blocked,
  Follow,
  GalleryProfile,
  Host,
  Message,
  Permission,
  Profile,
  Role,
  Transaction,
  Wallet,
} from './entities';
import { Country, Language } from '../complementary/entities';
import {
  HostService,
  FollowService,
  PermissionService,
  ProfileService,
  RolesService,
  WalletService,
  BlockService,
  GalleryProfileService,
} from './services';
import { AwsModule } from 'src/aws/aws.module';
import { MailModule } from 'src/mail/mail.module';
import { Answer } from '../management/entities';
import { AnswerService } from 'src/management/services';
import { FilesController } from './controllers/files.controller';
import { LikePublication } from 'src/my-world/entities/like-publication.entity';
import { Tag } from 'src/my-world/entities/tag.entity';
import { Comment } from 'src/my-world/entities/comment.entity';
import { BookingsModule } from 'src/bookings/bookings.module';
import { HostResolver } from './resolvers/host.resolver';
import { BlockResolver } from './resolvers/block.resolver';
import { FollowResolver } from './resolvers/follow.resolver';
import { GalleryResolver } from './resolvers/gallery.resolver';
import { Chat } from './entities/chat.entity';
import { Member } from './entities/member.entity';
import { ChatService } from './services/chat.service';
import { ChatResolver } from './resolvers/chat.resolver';
import { AppGateway } from './gateways/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Profile,
      Blocked,
      Follow,
      Role,
      Language,
      Host,
      Country,
      Permission,
      Transaction,
      Wallet,
      LikePublication,
      Tag,
      Comment,
      GalleryProfile,
      Message,
      Chat,
      Member,
    ]),
    ComplementaryModule,
    AwsModule,
    AuthModule,
    MailModule,
    BookingsModule,
  ],
  controllers: [FilesController],
  providers: [
    AnswerService,
    PermissionService,
    ProfileResolver,
    ProfileService,
    RolesService,
    HostService,
    FollowService,
    FollowResolver,
    WalletService,
    HostResolver,
    BlockResolver,
    BlockService,
    GalleryProfileService,
    GalleryResolver,
    AppGateway,
    ChatService,
    ChatResolver,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
