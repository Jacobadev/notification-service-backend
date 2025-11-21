import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,

} from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Find all notifications for a user' })
  @ApiResponse({
    status: 200,
    description: 'A list of notifications for the user.',
    type: [Notification],
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user to retrieve notifications for.',
    type: String,
  })
  findAll(
    @Param('userId') userId: string,
    @Query() { eventType, channel }: FindAllNotificationsDto,
  ) {
    return this.notificationsService.findAll(userId, { eventType, channel });
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully marked as read.',
    type: Notification,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the notification to mark as read.',
    type: String,
  })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
