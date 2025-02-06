import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { Notification } from '@/entities/notification.entity';
import { NotificationsController } from './notifications.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Notification])],
    providers: [NotificationsService, NotificationsGateway],
    exports: [NotificationsService, NotificationsGateway],
    controllers: [NotificationsController],
})

export class NotificationsModule {}
