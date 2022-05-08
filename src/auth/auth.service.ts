import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async getToken(userId: number) {
    const { email, photo, id, persons } = await this.userService.get(userId);
    const { name } = persons;

    return this.jwtService.sign({ name, email, photo, id });
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userService.getByEmail(email);

    await this.userService.checkPassword(user.id, password);

    const token = await this.getToken(user.id);

    return {
      token,
    };
  }

  async decodeToken(token: string) {
    try {
      await this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    return this.jwtService.decode(token);
  }

  async recovery(email: string) {
    const { id, persons } = await this.userService.getByEmail(email);
    const { name } = persons;
    const token = this.jwtService.sign({ id }, { expiresIn: 30 * 60 });

    await this.prisma.password_recovery.create({
      data: {
        userId: id,
        token,
      },
    });

    await this.mailService.send({
      to: email,
      subject: 'Esqueci a senha',
      template: 'forget',
      data: {
        name,
        url: `https://website.com.br/auth.html?token=${token}`,
      },
    });

    return { success: true };
  }

  async reset({ password, token }: { password: string; token: string }) {
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    try {
      await this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    const passwordRecovery = await this.prisma.password_recovery.findFirst({
      where: {
        token,
        resetAt: null,
      },
    });

    if (!passwordRecovery) {
      throw new BadRequestException('Token used');
    }

    await this.prisma.password_recovery.update({
      where: {
        id: passwordRecovery.id,
      },
      data: {
        resetAt: new Date(),
      },
    });

    return this.userService.updatePassword(passwordRecovery.userId, password);
  }
}
