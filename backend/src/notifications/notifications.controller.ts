import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    // Endpoint para obtener notificaciones de un usuario
    @Get('user/:userId')
    getUserNotifications(@Param('userId') userId: number) {
        return this.notificationsService.getNotificationsByUserId(userId);
    }
    @Get('user/:userId/unread')
    getUnreadNotifications(@Param('userId') userId: number) {
        return this.notificationsService.getUnreadNotifications(userId);
    }

    // Endpoint para marcar una notificación como leída
    @Patch(':id/read')
    markNotificationAsRead(@Param('id') id: number) {
        return this.notificationsService.markAsRead(id);
    }
}
