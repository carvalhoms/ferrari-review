import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: number, hash = false) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is required');
    }

    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        persons: true,
      },
    });

    if (!hash) {
      delete user.password;
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        persons: true,
      },
    });

    delete user.password;

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async create({
    name,
    email,
    password,
    birthAt,
    phone,
    document,
  }: {
    name: string;
    email: string;
    password: string;
    birthAt?: Date;
    phone?: string;
    document?: string;
  }) {
    if (!name) {
      throw new BadRequestException('Name is required.');
    }

    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    if (!password) {
      throw new BadRequestException('Password is required.');
    }

    if (birthAt && birthAt.toString().toLowerCase() === 'Invalid Date') {
      throw new BadRequestException('Date is invalid');
    }

    let user = null;

    try {
      user = await this.getByEmail(email);
    } catch (e) {}

    if (user) {
      throw new BadRequestException('Email already exists.');
    }

    const userCreated = await this.prisma.users.create({
      data: {
        persons: {
          create: {
            name,
            birthAt,
            document,
            phone,
          },
        },
        email,
        password: bcrypt.hashSync(password, 10),
      },
      include: {
        persons: true,
      },
    });

    delete userCreated.password;

    return userCreated;
  }

  async update(
    id: number,
    {
      name,
      email,
      birthAt,
      phone,
      document,
    }: {
      name: string;
      email: string;
      birthAt?: Date;
      phone?: string;
      document?: string;
    },
  ) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is not a number');
    }

    const dataPerson = {} as Prisma.personsUpdateInput;
    const dataUser = {} as Prisma.usersUpdateInput;

    if (name) {
      dataPerson.name = name;
    }

    if (birthAt) {
      dataPerson.birthAt = birthAt;
    }

    if (phone) {
      dataPerson.phone = phone;
    }

    if (document) {
      dataPerson.document = document;
    }

    if (email) {
      dataUser.email = email;
    }

    const user = await this.get(id);

    if (dataPerson) {
      await this.prisma.persons.update({
        where: {
          id: user.personId,
        },
        data: dataPerson,
      });
    }

    if (dataUser) {
      const userUpdated = await this.prisma.users.update({
        where: {
          id,
        },
        data: dataUser,
      });
    }

    return this.get(id);
  }

  async checkPassword(id: number, password: string) {
    const user = await this.get(id, true);

    user.password;

    const checked = await bcrypt.compare(password, user.password);

    if (!checked) {
      throw new UnauthorizedException('Email or passsword is incorrect');
    }

    return true;
  }
}
