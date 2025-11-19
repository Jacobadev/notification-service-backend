import { Channel, EventType, Frequency } from '@prisma/client';

export class CreatePreferenceDto {
  userId: string;
  eventType: EventType;
  channel: Channel;
  frequency: Frequency;
}

