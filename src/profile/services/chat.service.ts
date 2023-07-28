import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Message, Profile } from '../entities';
import { ProfileService } from './profile.service';
import { Chat } from '../entities/chat.entity';
import { Member } from '../entities/member.entity';
import { TypeChat } from 'src/shared/enum/type_chat.enum';
import { GraphQLError } from 'graphql';
import { CreateMessageInput } from '../dto/chat/message.input';
import { GetMessagesInput } from '../dto/chat/get_message.input';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly profileService: ProfileService,
  ) {}

  async sendMessage(payload: CreateMessageInput, senderId: string) {
    try {
      let receiver: Profile;
      if (payload.userId) {
        receiver = await this.profileService.findOneById(payload.userId);
      }
      const sender = await this.profileService.findOneById(senderId);
      let chat: Chat;
      const where = payload.chatId
        ? {
            type: TypeChat.P2P,
            id: payload.chatId,
            members: {
              member: {
                id: sender.id,
              },
            },
          }
        : {
            type: TypeChat.P2P,
            members: {
              member: {
                id: In([receiver.id, senderId]),
              },
            },
          };
      chat = await this.chatRepository.findOne({
        relations: {
          members: {
            member: true,
          },
        },
        where,
      });
      if (payload.chatId && !chat) {
        throw new GraphQLError('Chat not found');
      }
      if (!chat) {
        chat = this.chatRepository.create({
          type: TypeChat.P2P,
        });
        chat = await this.chatRepository.save(chat);
        await this.addMember(chat.id, receiver.id);
        await this.addMember(chat.id, sender.id);
      }
      const newMessage = this.messageRepository.create({
        message: payload.message,
        profile: sender,
        chat,
      });
      await this.messageRepository.save(newMessage);
      return true;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async getLastMessage(chatId: string, userId: string) {
    return this.messageRepository.findOne({
      relations: {
        chat: true,
        profile: true,
      },
      where: {
        chat: {
          id: chatId,
          members: {
            member: {
              id: userId,
            },
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getMessages(payload: GetMessagesInput, userId: string) {
    return this.messageRepository.find({
      relations: {
        chat: {
          members: {
            member: true,
          },
        },
        profile: {
          gallery: true,
        },
      },
      where: [
        {
          chat: {
            id: payload.chatId,
            members: {
              member: {
                id: userId,
              },
            },
          },
        },
        {
          chat: {
            members: {
              member: {
                id: In([userId, payload.userId]),
              },
            },
          },
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async addMember(chatId: string, userId: string) {
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
    });
    if (!chat) {
      throw new GraphQLError('Chat not found');
    }
    const user = await this.profileService.findOneById(userId);
    const member = this.memberRepository.create({
      chat,
      member: user,
    });
    await this.memberRepository.save(member);
  }
}
