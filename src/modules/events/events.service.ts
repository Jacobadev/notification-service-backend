import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { Frequency } from '@prisma/client';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: createEventDto,
    });

    const userPreferences = await this.prisma.preference.findMany({
      where: {
        eventType: createEventDto.type,
      },
      include: {
        user: true,
      },
    });

    for (const pref of userPreferences) {
      if (pref.frequency === Frequency.REAL_TIME) {
        await this.notificationsService.create({
          content: `New event: ${createEventDto.type}`,
          channel: pref.channel,
          userId: pref.userId,
          read: false,
          eventId: event.id,
        });
      }
    }

    return event;
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
