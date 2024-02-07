import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RLD } from './rld.entity';

@Entity('rnc_locus')
export class RL {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  assembly_id: string;

  @Column('text')
  locus_name: string;

  @Column('text')
  public_locus_name: string;

  @Column('text')
  chromosome: string;

  @Column('text')
  strand: string;

  @Column('int')
  locus_start: number;

  @Column('int')
  locus_stop: number;

  @Column('int')
  member_count: number;

  @OneToMany(() => RLD, (rld) => rld.rl)
  rls?: RLD[];
}
export { RLD };
