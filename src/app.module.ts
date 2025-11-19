import { Module } from '@nestjs/common';
import { EmailService } from './providers/email/email.service';
import { PrismaModule } from './providers/prisma/prisma.module';
import { EmailModule } from './providers/email/email.module';
import { UsersModule } from './modules/users/users.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EventsModule } from './modules/events/events.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PrismaModule, EmailModule, UsersModule, PreferencesModule, NotificationsModule, EventsModule, SchedulerModule, SharedModule],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
