import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Frequency } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron('0 0 * * *') // Every day at midnight
  async handleDaily() {
    const preferences = await this.prisma.preference.findMany({
      where: { frequency: Frequency.DAILY },
      include: { user: true },
    });

    for (const pref of preferences) {
      const notifications = await this.prisma.notification.findMany({
        where: {
          userId: pref.userId,
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 1)),
          },
          read: false,
        },
      });

      if (notifications.length > 0) {
        const content = `You have ${
          notifications.length
        } new notifications. ${notifications
          .map((n) => n.content)
          .join(', ')}`;
        await this.notificationsService.create({
          content,
          channel: pref.channel,
          userId: pref.userId,
          read: false,
        });
      }
    }
  }

  @Cron('0 0 * * 0') // Every Sunday at midnight
  async handleWeekly() {
    const preferences = await this.prisma.preference.findMany({
      where: { frequency: Frequency.WEEKLY },
      include: { user: true },
    });

    for (const pref of preferences) {
      const notifications = await this.prisma.notification.findMany({
        where: {
          userId: pref.userId,
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
          read: false,
        },
      });

      if (notifications.length > 0) {
        const content = `You have ${
          notifications.length
        } new notifications this week. ${notifications
          .map((n) => n.content)
          .join(', ')}`;
        await this.notificationsService.create({
          content,
          channel: pref.channel,
          userId: pref.userId,
          read: false,
        });
      }
    }
  }
}
