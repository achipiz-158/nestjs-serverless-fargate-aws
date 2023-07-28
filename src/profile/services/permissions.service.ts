import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(permissions: string | string[]): Promise<any> {
    try {
      const permissionsDb = [];

      if (Array.isArray(permissions)) {
        permissions.map(async (module) => {
          const permission = this.permissionRepository.create({
            module: module,
          });
          await this.permissionRepository.save(permission);
          permissionsDb.push(permission.id);
        });
        return permissionsDb;
      }

      if (typeof permissions === 'string') {
        const module = this.permissionRepository.create({
          module: permissions,
        });
        return await this.permissionRepository.save(module);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.permissionRepository.find({});
    } catch (error) {
      console.log(error);
    }
  }
}
