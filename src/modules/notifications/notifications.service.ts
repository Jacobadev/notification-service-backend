import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailService } from '../../providers/email/email.service';
import {Channel, EventType} from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: createNotificationDto,
    });

    if (createNotificationDto.channel === Channel.EMAIL) {
      const user = await this.prisma.user.findUnique({
        where: { id: createNotificationDto.userId },
      });
      if (user) {
        await this.emailService.sendEmail(
          user.email,
          'New Notification',
          notification.content,
        );
      }
    }

    return notification;
  }

  findAll(
    userId: string,
    filters: { eventType?: EventType; channel?: Channel },
  ) {
    return this.prisma.notification.findMany({
      where: {
        userId,
        ...(filters.eventType && { event: { type: filters.eventType } }),
        ...(filters.channel && { channel: filters.channel }),
      },
      include: {
        event: true,
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}
