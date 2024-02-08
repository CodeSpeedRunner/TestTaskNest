import { ApiProperty } from '@nestjs/swagger';

export class GetLocusQueryDto {
  @ApiProperty({ name: 'id', required: true, type: Number })
  id: number;

  @ApiProperty({ name: 'assembly_id', required: true, type: String })
  assembly_id: string;

  @ApiProperty({ name: 'region_id', required: true, type: Number })
  region_id: number;

  @ApiProperty({ name: 'membership_status', required: true, type: String })
  membership_status: string;
}
