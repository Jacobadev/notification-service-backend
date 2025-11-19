import { EventType } from '@prisma/client';

export class CreateEventDto {
  type: EventType;
  payload: object;
}

