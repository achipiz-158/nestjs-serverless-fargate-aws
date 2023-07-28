import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { MailService } from 'src/mail/service/mail.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileService } from 'src/profile/services/profile.service';
import { Repository } from 'typeorm';
import { RegisterInput } from '../dto/register.input';
import { Code } from '../entities/code.entity';
import { GraphQLError } from 'graphql';
import { TypeCode } from 'src/shared/enum/state/code.enum';
import { TokenResponse } from '../dto/token.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly jwtService: JwtService,
    private profileService: ProfileService,
    private mailService: MailService,
  ) {}

  async register(registerUserInput: RegisterInput) {
    try {
      const newProfile = await this.profileService.register(registerUserInput);
      const code: number = Math.floor(Math.random() * 1000000);
      await this.saveCode(code, newProfile);
      await this.mailService.sendMailCodeVerify(
        newProfile.email,
        'Verify your email',
        code,
      );
      return this.login(newProfile);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async regenerateCode(id: string) {
    try {
      const profile = await this.profileService.findUserId(id);
      if (profile.verifiedEmail) {
        throw new GraphQLError('Email already verified');
      }
      const code: number = Math.floor(Math.random() * 1000000);
      await this.saveCode(code, profile);
      await this.mailService.sendMailCodeVerify(
        profile.email,
        'Verify your email',
        code,
      );
      return true;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async validateUser(email: string, pass: string): Promise<Profile> {
    const user = await this.profileService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcryptjs.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  checkAdmin(e: any) {
    return e.rol !== 'Host' && e.rol !== 'Trippter';
  }

  async validateUserRol(id: string) {
    const user = await this.profileService.findUserId(id);
    const result = user.roles.map((e) => {
      return e.rol;
    });
    if (!result.includes('HOST') && !result.includes('TRIPPSTER'))
      return user.roles;
    if (result.includes('HOST')) return { rol: 'HOST' };
    if (result.includes('TRIPPSTER')) return { rol: 'TRIPPSTER' };
  }

  async login(profile: Profile): Promise<TokenResponse> {
    const payload = {
      email: profile.email,
      sub: profile.id,
      roles: profile.roles,
    };
    return {
      id: profile.id,
      profileImage: profile.gallery.find((e) => e.type === 'SECUNDARY')?.url,
      accessToken: this.jwtService.sign(payload),
      emailVerified: profile.verifiedEmail,
      registered: profile.name ? true : false,
      roles: profile.roles,
    };
  }

  generateJWT(user: Profile) {
    const payload = {
      roles: user.roles,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async saveCode(code: number, user: Profile, type: TypeCode = TypeCode.EMAIL) {
    const newCode = await this.codeRepository.findOne({
      where: {
        profile: {
          id: user.id,
        },
        type,
      },
    });
    if (newCode) {
      newCode.code = code;
      return await this.codeRepository.save(newCode);
    }
    return await this.codeRepository.save({
      code,
      profile: user,
      type,
    });
  }

  async saveCodeChangePassword(code: number, user: Profile) {
    const newCode = await this.codeRepository.findOne({
      where: {
        profile: {
          id: user.id,
        },
        type: TypeCode.PASSWORD,
      },
    });
    if (newCode) {
      newCode.code = code;
      return await this.codeRepository.save(newCode);
    }
    return await this.codeRepository.save({
      code,
      profile: user,
    });
  }

  async verifyEmail(code: number, userId: string) {
    try {
      const codeFound = await this.codeRepository.findOne({
        where: {
          code,
          profile: {
            id: userId,
          },
          type: TypeCode.EMAIL,
        },
      });
      if (!codeFound) {
        throw new GraphQLError('Codigo no encontrado');
      }
      if (codeFound.code !== code) {
        throw new GraphQLError('Codigo incorrecto');
      }
      const date = new Date(codeFound.updatedAt);
      date.setHours(date.getHours() + 1);
      if (date < new Date()) {
        const newCode = Math.floor(Math.random() * (999999 - 100000) + 100000);
        await this.saveCode(newCode, codeFound.profile);
        await this.mailService.sendMailCodeVerify(
          codeFound.profile.email,
          'Verify your email',
          newCode,
        );
        throw new GraphQLError('Codigo expirado');
      }
      const profile = await this.profileService.findOneById(userId);
      profile.verifiedEmail = true;
      await this.profileService.updateProfile(userId, profile);
      return {
        message: 'Email verified',
        status: true,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async sendCodeChangePassword(email: string) {
    try {
      const userProfile = await this.profileService.findByEmail(email);
      if (!userProfile) {
        throw new GraphQLError('Correo no encontrado');
      }
      const code = Math.floor(Math.random() * 1000000);
      await this.saveCode(code, userProfile, TypeCode.PASSWORD);
      await this.mailService.sendMailCodeVerify(
        userProfile.email,
        'Cambiar contraseña',
        code,
      );
      return true;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async verifyCodeChangePassword(code: number) {
    try {
      const codeFound = await this.codeRepository.findOne({
        where: {
          code,
          type: TypeCode.PASSWORD,
        },
        relations: ['profile'],
      });
      if (!codeFound) {
        throw new GraphQLError('Codigo no encontrado');
      }
      const date = new Date(codeFound.updatedAt);
      date.setHours(date.getHours() + 1);
      if (date < new Date()) {
        throw new GraphQLError('Codigo expirado');
      }
      const payload = {
        email: codeFound.profile.email,
        sub: codeFound.profile.id,
      };
      return this.jwtService.sign(payload, {
        expiresIn: '1h',
      });
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async resetPassword(password: string, profileId: string) {
    try {
      const profile = await this.profileService.findOneById(profileId);
      if (!profile) {
        throw new GraphQLError('Usuario no encontrado');
      }
      profile.password = await bcryptjs.hash(password, 10);
      await this.profileService.updateProfile(profileId, profile);
      return true;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
