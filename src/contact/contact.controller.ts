import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async create(
    @Body('name') name,
    @Body('email') email,
    @Body('message') message,
  ) {
    this.contactService.create({
      message,
      name,
      email,
    });
  }
}
