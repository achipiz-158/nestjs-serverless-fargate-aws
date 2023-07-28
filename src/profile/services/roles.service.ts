import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities';
import { PermissionService } from './permissions.service';
import { CreateAdministrativeRoleInput } from '../dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

  findRoleByName(name: string) {
    return this.roleRepository.findOne({ where: { rol: name } });
  }

  findRoleById(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }
  async createAdministrativeRole(
    createAdministrativeRoleInput: CreateAdministrativeRoleInput,
  ): Promise<any> {
    try {
      const { rol, permissions } = createAdministrativeRoleInput;

      const permissionsDb = await this.permissionService.create(permissions);
      const role = this.roleRepository.create({
        rol,
        permissions: permissionsDb,
      });
      return await this.roleRepository.save(role);
    } catch (error) {
      console.log(error);
    }
  }
  async findAll(role?: string): Promise<any> {
    try {
      if (role) {
        return await this.roleRepository.find({
          where: { rol: role, profile: {} },
          relations: ['profile'],
        });
      } else {
        return await this.roleRepository.find();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
