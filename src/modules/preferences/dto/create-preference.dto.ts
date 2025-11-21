import { ApiProperty } from '@nestjs/swagger';
import { Channel, EventType, Frequency } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'cuid-generated-string',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The type of event for the preference.',
    enum: EventType,
    example: EventType.NEW_AUDIT,
  })
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty({
    description: 'The notification channel for the preference.',
    enum: Channel,
    example: Channel.EMAIL,
  })
  @IsEnum(Channel)
  channel: Channel;

  @ApiProperty({
    description: 'The frequency of notifications for the preference.',
    enum: Frequency,
    example: Frequency.REAL_TIME,
  })
  @IsEnum(Frequency)
  frequency: Frequency;
}

