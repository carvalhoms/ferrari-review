import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimeOptionsService } from './time-options.service';

@Controller('time-options')
export class TimeOptionsController {
  constructor(private timeOptionService: TimeOptionsService) {}

  @Get()
  async getTimeOptions() {
    return this.timeOptionService.listTimeOptions();
  }

  @Post()
  async create(@Body('day') day, @Body('time') time) {
    return this.timeOptionService.createTimeOption({
      day,
      time,
    });
  }
}
