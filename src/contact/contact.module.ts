import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
