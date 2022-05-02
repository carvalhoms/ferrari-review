import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: number) {
    // Converte o id em string vindo no método get para número
    id = Number(id);

    // Verificando se o id é numérico, se não for exibe erro
    if (isNaN(id)) {
      throw new BadRequestException('Id is required');
    }

    // Busca usuário no banco pelo id
    // findUnique traz usuário único encontrado
    const user = await this.prisma.users.findUnique({
      // where busca usuário pelo id
      where: {
        id,
      },
      // include busca persons relacionados ao usuário obtido pelo whare
      include: {
        persons: true,
      },
    });

    // Verifica se existe algum usuário, se não existir exibe erro
    if (!user) {
      throw new BadGatewayException('User not found');
    }

    // Retornando usuário encontrado
    return user;
  }

  async getByEmail(email: string) {
    // Verificando se o email existe
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // Busca usuário no banco pelo email
    // findUnique traz usuário único encontrado
    const user = await this.prisma.users.findUnique({
      // where para buscar usuário pelo email
      where: {
        email,
      },
      // include busca persons relacionados ao usuário obtido pelo whare
      include: {
        persons: true,
      },
    });

    // Verifica se existe algum usuário, se não existir exibe erro
    if (!user) {
      throw new BadGatewayException('User not found');
    }

    // Retornando usuário encontrado
    return user;
  }
}
