import { Module } from '@nestjs/common';
import { ManagementResolver } from './management.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role } from '../profile/entities';
import { Answer } from './entities';
import { TrippManagementService } from './services';
import { RolesService, PermissionService } from 'src/profile/services';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, Role, Permission]),
    ProfileModule,
  ],
  providers: [
    ManagementResolver,
    TrippManagementService,
    RolesService,
    PermissionService,
  ],
})
export class ManagementModule {}
