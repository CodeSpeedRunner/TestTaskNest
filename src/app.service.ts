import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RL } from './entities/rl.entity';
import { Repository } from 'typeorm';
import { RLD } from './entities/rld.entity';
import { GetLocusQueryDto } from './dto/rl.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(RL)
    readonly rlRepository: Repository<RL>,
    @InjectRepository(RLD)
    readonly rldRepository: Repository<RLD>,
  ) {}

  async getLocus(
    locus: GetLocusQueryDto,
    sideloading: boolean,
    page: number,
    limit: number,
    role: string,
  ): Promise<RL[]> {
    const offset = page * limit - limit;

    try {
      if (role === 'admin') {
        if (sideloading) {
          const result = await this.rlRepository
            .createQueryBuilder('rnc_locus')
            .leftJoinAndSelect('rnc_locus.rlds', 'rld')
            .where('rnc_locus.id = :id', {
              id: locus.id,
            })
            .andWhere('rnc_locus.assembly_id = :assemblyId', {
              assemblyId: locus.assembly_id,
            })
            .andWhere('rld.region_id = :regionId', {
              regionId: locus.region_id,
            })
            .andWhere('rld.membership_status = :membership_status', {
              membership_status: locus.membership_status,
            })
            .take(limit)
            .skip(offset)
            .getMany();
          return result;
        } else {
          const result = await this.rlRepository
            .createQueryBuilder('rnc_locus')
            .where('rnc_locus.id = :id', {
              id: locus.id,
            })
            .andWhere('rnc_locus.assembly_id = :assemblyId', {
              assemblyId: locus.assembly_id,
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
            id: locus.id,
          })
          .andWhere('rnc_locus.assembly_id = :assemblyId', {
            assemblyId: locus.assembly_id,
          })
          .getMany();
        return result;
      } else {
        if (
          locus.region_id == 86118093 ||
          locus.region_id == 86696489 ||
          locus.region_id == 88186467
        ) {
          if (sideloading) {
            const result = await this.rlRepository
              .createQueryBuilder('rnc_locus')
              .leftJoinAndSelect('rnc_locus.rls', 'rld')
              .where('rnc_locus.id = :id', {
                id: locus.id,
              })
              .andWhere('rnc_locus.assembly_id = :assemblyId', {
                assemblyId: locus.assembly_id,
              })
              .andWhere('rld.region_id = :regionId', {
                regionId: locus.region_id,
              })
              .andWhere('rld.membership_status = :membership_status', {
                membership_status: locus.membership_status,
              })
              .take(limit)
              .skip(offset)
              .getMany();
            return result;
          } else {
            const result = await this.rlRepository
              .createQueryBuilder('rnc_locus')
              .where('rnc_locus.id = :id', {
                id: locus.id,
              })
              .andWhere('rnc_locus.assembly_id = :assemblyId', {
                assemblyId: locus.assembly_id,
              })
              .take(limit)
              .skip(offset)
              .getMany();
            return result;
          }
        }
      }
    } catch (err: any) {
      throw err;
    }
  }
}
