import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RL } from './entities/rl.entity';
import { Repository } from 'typeorm';
import { RLD } from './entities/rld.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(RL)
    readonly rlRepository: Repository<RL>,
    @InjectRepository(RLD)
    readonly rldRepository: Repository<RLD>,
  ) {}

  async getLocus(
    id: number,
    assemblyId: string,
    regionId: number,
    membership_status: string,
    sideloading: boolean,
    page: number,
    limit: number,
    role: string,
  ): Promise<RL[]> {
    const offset = page * limit - limit;

    if (role === 'admin') {
      if (sideloading) {
        const result = await this.rlRepository
          .createQueryBuilder('rnc_locus')
          .leftJoinAndSelect('rnc_locus.rls', 'rld')
          .where('rnc_locus.id = :id', {
            id: id,
          })
          .andWhere('rnc_locus.assembly_id = :assemblyId', {
            assemblyId: assemblyId,
          })
          .andWhere('rld.region_id = :regionId', {
            regionId: regionId,
          })
          .andWhere('rld.membership_status = :membership_status', {
            membership_status: membership_status,
          })
          .take(limit)
          .skip(offset)
          .getMany();
        return result;
      } else {
        const result = await this.rlRepository
          .createQueryBuilder('rnc_locus')
          .where('rnc_locus.id = :id', {
            id: id,
          })
          .andWhere('rnc_locus.assembly_id = :assemblyId', {
            assemblyId: assemblyId,
          })
          .take(limit)
          .skip(offset)
          .getMany();
        return result;
      }
    } else if (role === 'normal') {
      const result = await this.rlRepository
        .createQueryBuilder('rnc_locus')
        .where('rnc_locus.id = :id', {
          id: id,
        })
        .andWhere('rnc_locus.assembly_id = :assemblyId', {
          assemblyId: assemblyId,
        })
        .take(limit)
        .skip(offset)
        .getMany();
      return result;
    } else {
      if (
        regionId == 86118093 ||
        regionId == 86696489 ||
        regionId == 88186467
      ) {
        if (sideloading) {
          const result = await this.rlRepository
            .createQueryBuilder('rnc_locus')
            .leftJoinAndSelect('rnc_locus.rls', 'rld')
            .where('rnc_locus.id = :id', {
              id: id,
            })
            .andWhere('rnc_locus.assembly_id = :assemblyId', {
              assemblyId: assemblyId,
            })
            .andWhere('rld.region_id = :regionId', {
              regionId: regionId,
            })
            .andWhere('rld.membership_status = :membership_status', {
              membership_status: membership_status,
            })
            .take(limit)
            .skip(offset)
            .getMany();
          return result;
        } else {
          const result = await this.rlRepository
            .createQueryBuilder('rnc_locus')
            .where('rnc_locus.id = :id', {
              id: id,
            })
            .andWhere('rnc_locus.assembly_id = :assemblyId', {
              assemblyId: assemblyId,
            })
            .take(limit)
            .skip(offset)
            .getMany();
          return result;
        }
      }
    }
  }
}
