import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service'; // Ajusta el path según tu estructura

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
