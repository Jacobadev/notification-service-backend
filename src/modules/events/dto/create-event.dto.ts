import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { IsEnum, IsObject } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'The type of the event.',
    enum: EventType,
    example: EventType.NEW_AUDIT,
  })
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty({
    description: 'The payload of the event.',
    example: { data: 'some-payload' },
  })
  @IsObject()
  payload: object;
}

