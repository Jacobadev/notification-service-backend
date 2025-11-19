import { Channel } from '@prisma/client';

export class CreateNotificationDto {
  content: string;
  channel: Channel;
  userId: string;
  read: boolean;
  eventId?: string;
}
