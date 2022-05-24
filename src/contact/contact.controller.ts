import { Body, Controller, Post } from '@nestjs/common';

@Controller('contacts')
export class ContactController {
  @Post()
  async create(
    @Body('name') name,
    @Body('email') email,
    @Body('message') message,
  ) {
    return {
      name,
      email,
      message,
    };
  }
}
