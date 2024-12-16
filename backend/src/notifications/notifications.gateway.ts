import { Injectable } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*', // Permite conexiones desde cualquier origen
    },
})
@Injectable()
export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;

    handleNotification(payload: any) {
        this.server.emit('new_notification', payload);
    }

    handleConnection(client: Socket) {
        console.log('A user connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('A user disconnected:', client.id);
    }
    async emitTestNotification() {
        const testPayload = {
            message: 'Notificación de prueba',
            reservationId: 123,
            userId: 1,
        };
        this.server.emit('new_notification', testPayload);
        console.log('Test notification emitted:', testPayload);
    }
}
