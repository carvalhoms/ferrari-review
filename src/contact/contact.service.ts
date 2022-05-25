import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prismaService: PrismaService) {}

  async create({
    name,
    email,
    message,
  }: {
    name: string;
    email: string;
    message: string;
  }) {
    if (!name) {
      throw new BadRequestException('O nome é obrigatório.');
    }

    if (!email) {
      throw new BadRequestException('O email é obrigatório.');
    }

    if (!message) {
      throw new BadRequestException('A mensagem é obrigatória.');
    }

    let personId: number;

    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
      select: {
        personId: true,
      },
    });

    if (user) {
      personId = Number(user.personId);
    } else {
      const contact = await this.prismaService.contacts.findFirst({
        where: {
          email,
        },
      });

      if (contact) {
        personId = Number(contact.personId);
      } else {
        const newPerson = await this.prismaService.persons.create({
          data: {
            name,
          },
        });

        personId = Number(newPerson);
      }
    }

    return this.prismaService.contacts.create({
      data: {
        personId,
        email,
        message,
      },
    });
  }
}
