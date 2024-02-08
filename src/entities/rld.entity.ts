import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RL } from './rl.entity';

@Entity('rnc_locus_members')
export class RLD {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  urs_taxid: string;

  @Column('int')
  region_id: number;

  @Column('bigint')
  locus_id: number;

  @ManyToOne(() => RL, (rl) => rl.rlds)
  @JoinColumn({ name: 'locus_id' })
  rl: RL;

  @Column('text')
  membership_status: string;
}
