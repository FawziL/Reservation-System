import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('api/notifications') 
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    //Obtiene todas las notificaciones de un usuario específico.
    @ApiOperation({ summary: 'Obtener notificaciones de un usuario' })
    @ApiResponse({ status: 200, description: 'Notificaciones obtenidas exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
    @Get('user/:userId')
    getUserNotifications(@Param('userId') userId: number) {
        return this.notificationsService.getNotificationsByUserId(userId);
    }

    //Obtiene solo las notificaciones no leídas de un usuario específico.
    @ApiOperation({ summary: 'Obtener notificaciones no leídas de un usuario' })
    @ApiResponse({ status: 200, description: 'Notificaciones no leídas obtenidas exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
    @Get('user/:userId/unread') 
    getUnreadNotifications(@Param('userId') userId: number) {
        return this.notificationsService.getUnreadNotifications(userId);
    }

    // Marca una notificación específica como leída.
    @ApiOperation({ summary: 'Marcar una notificación como leída' })
    @ApiResponse({ status: 200, description: 'Notificación marcada como leída' })
    @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
    @ApiParam({ name: 'id', type: Number, description: 'ID de la notificación' })
    @Patch(':id/read') 
    markNotificationAsRead(@Param('id') id: number) {
        return this.notificationsService.markAsRead(id);
    }
}
