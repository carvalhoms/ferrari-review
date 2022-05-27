import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async get(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is not a number');
    }

    return this.prisma.contacts.findUnique({
      where: {
        id,
      },
    });
  }

  async list() {
    return this.prisma.contacts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

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

    const user = await this.prisma.users.findUnique({
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
      const contact = await this.prisma.contacts.findFirst({
        where: {
          email,
        },
      });

      if (contact) {
        personId = Number(contact.personId);
      } else {
        const newPerson = await this.prisma.persons.create({
          data: {
            name,
          },
        });

        personId = Number(newPerson.id);
      }
    }

    return this.prisma.contacts.create({
      data: {
        personId,
        email,
        message,
      },
    });
  }

  async delete(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is invalid');
    }

    if (!(await this.get(id))) {
      throw new NotFoundException('Id not exists');
    }

    return this.prisma.contacts.delete({
      where: {
        id,
      },
    });
  }
}
