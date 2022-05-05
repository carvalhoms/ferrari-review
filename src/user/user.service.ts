import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: number) {
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

    delete user.password;

    if (!user) {
      throw new BadGatewayException('User not found');
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
      throw new BadGatewayException('User not found');
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
}
