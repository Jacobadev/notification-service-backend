import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EventType, Channel } from '@prisma/client';

export class FindAllNotificationsDto {
  @ApiPropertyOptional({
    description: 'Filter by event type.',
    enum: EventType,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @ApiPropertyOptional({
    description: 'Filter by channel.',
    enum: Channel,
  })
  @IsOptional()
  @IsEnum(Channel)
  channel?: Channel;
}

