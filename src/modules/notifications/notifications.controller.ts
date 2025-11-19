import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventType, Channel } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  findAll(
    @Param('userId') userId: string,
    @Query('eventType') eventType?: EventType,
    @Query('channel') channel?: Channel,
  ) {
    return this.notificationsService.findAll(userId, { eventType, channel });
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
