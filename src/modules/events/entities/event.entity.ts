import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { Notification } from '../../notifications/entities/notification.entity';

export class Event {
  @ApiProperty({
    description: 'The unique identifier of the event.',
    example: 'cuid-generated-string',
  })
  id: string;

  @ApiProperty({
    description: 'The type of the event.',
    enum: EventType,
    example: EventType.NEW_AUDIT,
  })
  type: EventType;

  @ApiProperty({
    description: 'The payload of the event.',
    example: { data: 'some-payload' },
  })
  payload: any;

  @ApiProperty({
    description: 'The date and time when the event was created.',
    example: '2025-11-19T19:55:54.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The notifications triggered by the event.',
    type: () => [Notification],
  })
  notifications?: Notification[];
}
