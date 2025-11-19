import { ApiProperty } from '@nestjs/swagger';
import { Channel, EventType } from '@prisma/client';
import { Event } from '../../events/entities/event.entity';

export class Notification {
  @ApiProperty({
    description: 'The unique identifier of the notification.',
    example: 'cuid-generated-string',
  })
  id: string;

  @ApiProperty({
    description: 'The content of the notification.',
    example: 'Your report is ready.',
  })
  content: string;

  @ApiProperty({
    description: 'The channel through which the notification was sent.',
    enum: Channel,
    example: Channel.IN_APP,
  })
  channel: Channel;

  @ApiProperty({
    description: 'Indicates whether the notification has been read.',
    example: false,
  })
  read: boolean;

  @ApiProperty({
    description: 'The unique identifier of the user who received the notification.',
    example: 'cuid-generated-string',
  })
  userId: string;

  @ApiProperty({
    description: 'The unique identifier of the event that triggered the notification.',
    example: 'cuid-generated-string',
    nullable: true,
  })
  eventId: string | null;

  @ApiProperty({
    description: 'The date and time when the notification was created.',
    example: '2025-11-19T19:55:54.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The event that triggered the notification.',
    type: () => Event,
  })
  event?: Event;
}
