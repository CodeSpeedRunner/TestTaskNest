import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetLocusQueryDto } from './dto/rl.dto';
import { RL } from './entities/rl.entity';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('/GET locus', async () => {
      const locus: GetLocusQueryDto = {
        id: 2537847,
        assembly_id: 'ASM1334776v1',
        region_id: 88376173,
        membership_status: 'highlighted',
      };
      const sessionStorage = {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiVXNlcjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDczOTg4ODAsImV4cCI6MTcwNzQwNjA4MH0.L7iFBajgDxkKbYpgHiX0q-TkjDp4nm3C9jnotHQPnBU',
      };
      // const rlds: RLD[] = [
      //   {
      //     id: 3101759,
      //     urs_taxid: 'URS00021F1CB1_52904',
      //     region_id: 88376173,
      //     locus_id: 2537847,
      //     membership_status: 'highlighted',
      //   },
      // ];
      const rls: RL[] = [
        {
          id: 2537847,
          assembly_id: 'ASM1334776v1',
          locus_name:
            '5bdc103286d4b25bc920b588dadc3ed12ba393d62d03a973be94149ba533654f@JABGBL010000105.1/238647-637957:1',
          public_locus_name: 'DC8DBFB19468DC16',
          chromosome: 'JABGBL010000105.1',
          strand: '1',
          locus_start: 238647,
          locus_stop: 637957,
          member_count: 1552,
        },
      ];
      jest
        .spyOn(appService, 'getLocus')
        .mockImplementation(async () => await Promise.resolve(rls));
      const result = await appController.getLocus(
        locus,
        'false',
        1,
        1000,
        sessionStorage,
      );
      expect(result).toBe(rls);
    });
  });
});
