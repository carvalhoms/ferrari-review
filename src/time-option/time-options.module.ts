import { TimeOptionsService } from './time-options.service';
import { TimeOptionsController } from './time-options.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeOptionsController],
  providers: [TimeOptionsService],
})
export class TimeOptionsModule {}
