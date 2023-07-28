import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import { CountryService, ProcedureService } from '../../complementary/services';

import * as bcryptjs from 'bcryptjs';
import {
  CompleteHostInput,
  CreateManagementInput,
  CreateProfileHostInput,
  CreateProfileTrippsterInput,
  UpdateManagementInput,
} from '../dto';
import { RegisterInput } from '../../auth/dto/register.input';
import { Profile } from '../entities/profile.entity';
import { HostService } from './host.service';
import { RolesService } from './roles.service';
import { AuthorizeHostInput } from 'src/management/dto';
import { AnswerService } from 'src/management/services';
import { generatePassword } from 'src/management/utils';
import { ChangePasswordInput } from '../dto/profile/change-password.input';
import { GraphQLError } from 'graphql';
import { WalletService } from './wallet.service';
import { S3Service } from 'src/aws/services/s3.service';
import { UpdateHostInput } from '../dto/profile/update-host.input';
import { UpdateProfileInput } from '../dto/profile/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private rolesService: RolesService,
    @Inject(forwardRef(() => HostService))
    private hostService: HostService,
    private countryService: CountryService,
    private readonly walletService: WalletService,
    private readonly procedureService: ProcedureService,
    private readonly answerService: AnswerService,
    private readonly s3Service: S3Service,
  ) {}

  async register(registerUserInput: RegisterInput) {
    try {
      const newProfile = await this.profileRepository.create(registerUserInput);
      newProfile.password = await bcryptjs.hash(registerUserInput.password, 10);
      await this.walletService.create(newProfile);
      return await this.profileRepository.save(newProfile);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new GraphQLError('Este email ya existe');
      }
    }
  }

  async registerTrippster(
    createProfileInput: CreateProfileTrippsterInput,
    id: string,
  ) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id },
      });
      const country = await this.countryService.findOneById(
        createProfileInput.countryId,
      );
      profile.country = country;
      this.profileRepository.merge(profile, createProfileInput);
      const rol = await this.rolesService.findRoleByName('TRIPPSTER');
      profile.roles = [rol];
      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async registerHost(createProfileInput: CreateProfileHostInput, id: string) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id },
        relations: {
          host: true,
        },
      });
      const country = await this.countryService.findOneById(
        createProfileInput.countryId,
      );
      if (!profile.host) {
        await this.hostService.createHostVoid(profile);
      }
      await this.hostService.updateDataHost(
        {
          document: createProfileInput.document,
          documentType: createProfileInput.documentType,
          languagesIds: createProfileInput.languagesIds,
          company: createProfileInput.company,
          NIT: createProfileInput.NIT,
        },
        profile,
      );
      await this.profileRepository.merge(profile, {
        ...createProfileInput,
        country,
      });
      await this.profileRepository.save(profile);
      this.procedureService.create({
        type: 'host-authorization',
        affair: 'Autorización usuario host',
        applicant: profile,
      });
      return true;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async completeProfileHost(CompleteHostInput: CompleteHostInput) {
    const profile = await this.profileRepository.findOne({
      where: { id: CompleteHostInput.profileId },
      relations: ['host'],
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    this.profileRepository.merge(profile, CompleteHostInput);
    this.hostService.completeHost(profile.host.id, CompleteHostInput.nequi);
    return await this.profileRepository.save(profile);
  }

  async findHost(id: string) {
    return await this.hostService.findHost(id);
  }

  async findAll(role?: string) {
    if (role) {
      return await this.profileRepository.find({
        relations: ['roles'],
        where: {
          roles: {
            rol: role,
          },
        },
      });
    }
    return await this.profileRepository.find({
      relations: ['roles'],
    });
  }

  async findOneById(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        country: true,
        code: true,
        followers: true,
        follows: true,
        favorites: true,
        gallery: true,
        host: {
          rating: true,
          languages: true,
        },
        publications: true,
      },
    });
    if (!profile) {
      throw new GraphQLError('Perfil no encontrado');
    }
    return profile;
  }

  async deleteProfile(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['host'],
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    if (profile.host) {
      await this.hostService.deleteHost(profile.host.id);
    }
    return await this.profileRepository.remove(profile);
  }

  async findByEmail(email: string) {
    return await this.profileRepository.findOne({
      where: { email },
      relations: { roles: true, gallery: true },
    });
  }

  async updateProfile(id: string, user: Profile) {
    const profile = await this.profileRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    this.profileRepository.merge(profile, user);
    return await this.profileRepository.save(profile);
  }

  // services manager

  async createManager(createManagementInput: CreateManagementInput) {
    const { rol } = createManagementInput;
    try {
      const role = await this.rolesService.findRoleById(rol);
      const newProfile = this.profileRepository.create(createManagementInput);
      newProfile.roles = [role];
      const password = generatePassword();
      // enviar correo con la contraseña asignada
      newProfile.password = await bcryptjs.hash(password, 10);
      return await this.profileRepository.save(newProfile);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAllRoles() {
    return await this.profileRepository.find({
      where: {
        host: {
          id: Not(IsNull()),
        },
      },
      relations: {
        roles: true,
        host: true,
      },
      order: { verifiedHost: 'ASC' },
    });
  }

  async findUserId(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: [
        'roles',
        'roles.permissions',
        'requests',
        'requests.answers',
        'requests.answers.manager',
        'procedures',
        'country',
        'host',
        'host.languages',
      ],
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  async hostAuthorization(
    user: Profile,
    authorizeHostInput: AuthorizeHostInput,
  ) {
    const { procedureId, ...res } = authorizeHostInput;
    const procedure = await this.procedureService.findOneById(procedureId);
    const answer = await this.answerService.create({
      procedure,
      manager: user,
      ...res,
    });

    if (
      (authorizeHostInput.type === 'host-authorization' ||
        authorizeHostInput.type === 'host denial') &&
      procedure.state === 'pending'
    ) {
      const userApplicant = await this.profileRepository.findOne({
        where: { id: procedure.applicant.id },
        relations: ['roles'],
      });
      if (!userApplicant) {
        throw new GraphQLError('Usuario no encontrado');
      }
      const rolHost = await this.rolesService.findRoleByName('HOST');
      if (userApplicant.roles.filter((rol) => rol.rol === 'HOST').length > 0) {
        throw new GraphQLError('El usuario ya es host');
      }
      const roles = [rolHost, ...userApplicant.roles].filter(
        (rol) => rol.rol !== 'TRIPPSTER',
      );
      userApplicant.roles = roles;
      await this.profileRepository.merge(userApplicant, {
        verifiedHost: !user.verifiedHost,
      });
      await this.profileRepository.save(userApplicant);
      await this.procedureService.updateState(procedureId, 'resolved');
      return userApplicant;
    } else {
      return answer;
    }
  }

  async updateManager(id: string, manager: UpdateManagementInput) {
    const profile = await this.findOneById(id);

    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    this.profileRepository.merge(profile, manager);
    return await this.profileRepository.save(profile);
  }

  async changePassword(id: string, changePasswordInput: ChangePasswordInput) {
    const profile = await this.findOneById(id);
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcryptjs.compare(
      changePasswordInput.oldPassword,
      profile.password,
    );
    if (!isMatch) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    profile.password = await bcryptjs.hash(changePasswordInput.newPassword, 10);
    await this.profileRepository.save(profile);
    return true;
  }

  async changeBio(id: string, bio: string) {
    const profile = await this.findOneById(id);
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    this.profileRepository.merge(profile, { bio });
    return await this.profileRepository.save(profile);
  }

  async revertHost(id: string) {
    const profile = await this.findOneById(id);
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    await this.hostService.deleteHost(profile.host.id);
    const rol = await this.rolesService.findRoleByName('TRIPPSTER');
    profile.roles = [rol];
    this.profileRepository.merge(profile, { host: null });
    await this.profileRepository.save(profile);
    return true;
  }

  async assistants(hourId: string, date: string, profileId: string) {
    const profiles = await this.profileRepository.find({
      where: {
        id: Not(profileId),
        bookings: {
          hour: {
            id: hourId,
          },
          date: new Date(date),
        },
      },
      relations: ['bookings', 'bookings.hour'],
    });
    return profiles;
  }

  async uploadFiletoHost(id: string, file: Express.Multer.File, type: string) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id },
        relations: ['host'],
      });
      if (!profile) {
        throw new GraphQLError('Profile not found');
      }
      if (!profile.host) {
        await this.hostService.createHostVoid(profile);
      }
      switch (type) {
        case 'front':
          await this.hostService.uploadDNIFront(profile.id, file);
          break;
        case 'back':
          await this.hostService.uploadDNIBack(profile.id, file);
          break;
        case 'rut':
          await this.hostService.uploadRUT(profile.id, file);
          break;
        default:
          throw new GraphQLError('Type not found');
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async updateProfileHost(updateProfileHost: UpdateHostInput, id: string) {
    const hostId: string = (await this.updateProfileTrippster(
      {
        name: updateProfileHost.name,
        lastname: updateProfileHost.lastname,
        gender: updateProfileHost.gender,
        dateOfBirth: updateProfileHost.dateOfBirth,
        prefix: updateProfileHost.prefix,
        phone: updateProfileHost.phone,
        profession: updateProfileHost.profession,
        countryId: updateProfileHost.countryId,
      },
      id,
      true,
    )) as string;
    await this.hostService.updateHost(hostId, updateProfileHost);
    return true;
  }

  async updateProfileTrippster(
    updateProfile: UpdateProfileInput,
    id: string,
    host = false,
  ) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: {
        host,
        country: true,
      },
    });
    if (!profile) {
      throw new GraphQLError('Profile not found');
    }
    if (!profile.host && host) {
      throw new GraphQLError('Profile is not host');
    }
    if (profile.country.id !== updateProfile.countryId) {
      const country = await this.countryService.findOneById(
        updateProfile.countryId,
      );
      profile.country = country;
    }
    await this.profileRepository.merge(profile, {
      name: updateProfile.name,
      lastname: updateProfile.lastname,
      gender: updateProfile.gender,
      dateOfBirth: updateProfile.dateOfBirth,
      prefix: updateProfile.prefix,
      phone: updateProfile.phone,
      profession: updateProfile.profession,
    });
    await this.profileRepository.save(profile);
    return host ? profile.host.id : true;
  }

  async getUsersBlocked(id: string) {
    const profiles = await this.profileRepository.find({
      where: {
        blocked: {
          blocker: { id },
        },
      },
      relations: {
        blocker: true,
        country: true,
        gallery: true,
      },
    });
    return profiles;
  }

  async getUsersFollowing(id: string) {
    const profilesFollowers = await this.profileRepository.find({
      where: {
        follows: {
          followed: { id },
        },
      },
      relations: {
        followers: {
          followed: true,
        },
        country: true,
        gallery: true,
      },
    });
    const profilesFolloweds = await this.profileRepository.find({
      where: {
        followers: {
          follower: { id },
        },
      },
      relations: {
        followers: {
          follower: true,
        },
        country: true,
        gallery: true,
      },
    });
    return [...profilesFollowers, ...profilesFolloweds];
  }

  async getChats(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: {
        members: {
          chat: {
            members: {
              member: {
                gallery: true,
              },
            },
          },
          member: true,
        },
      },
    });
    const chats = profile.members.map((member) => member.chat);
    return chats;
  }

  async statusUser(currentUserId: string, profileId: string) {
    const profile = await this.profileRepository.findOne({
      where: {
        id: currentUserId,
        blocker: {
          blocked: {
            id: profileId,
          },
        },
      },
      relations: {
        blocked: {
          blocker: true,
        },
      },
    });
    if (!profile) {
      const profile = await this.profileRepository.findOne({
        where: [
          {
            id: currentUserId,
            followers: {
              follower: {
                id: profileId,
              },
            },
          },
          {
            id: currentUserId,
            follows: {
              followed: {
                id: profileId,
              },
            },
          },
        ],
        relations: {
          followers: {
            follower: true,
          },
          follows: {
            followed: true,
          },
        },
      });
      if (!profile) {
        return 'none';
      }
      return 'follow';
    }
    return 'blocked';
  }

  async isBlock(currentUserId: string, profileId: string): Promise<boolean> {
    const profile = await this.profileRepository.findOne({
      where: { id: currentUserId, blocked: { blocker: { id: profileId } } },
      relations: {
        blocked: {
          blocker: true,
        },
      },
    });
    if (!profile) {
      return false;
    }
    return true;
  }
}
