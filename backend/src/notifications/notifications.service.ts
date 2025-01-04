import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsGateway } from './notifications.gateway';
import { Notification } from '@/entities/notification.entity';

@Injectable()
export class NotificationsService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepo: Repository<Notification>,
        private readonly notificationsGateway: NotificationsGateway,
    ) {}

    // Enviar un correo electrónico
    async sendEmail(options: { to: string; subject: string; text: string }) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Could not send email');
        }
    }

    // Guardar una notificación en la base de datos
    async createNotification(message: string, userId: number, reservationId: number,): Promise<Notification> {
        const notification = this.notificationsRepo.create({
            message,
            userId,
            reservationId,
        })
        return await this.notificationsRepo.save(notification);
    }

    // Enviar una notificación WebSocket
    sendNotification(message: any) {
        this.notificationsGateway.handleNotification(message); // Emite el mensaje a los clientes conectados
    }

    // Obtener notificaciones de un usuario
    async getNotificationsByUserId(userId: number): Promise<Notification[]> {
        return await this.notificationsRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async getUnreadNotifications(userId: number): Promise<Notification[]> {
        return await this.notificationsRepo.find({
            where: { userId, isRead: false },
            order: { createdAt: 'DESC' },
        });
    }
    async markAsRead(id: number) {
        return await this.notificationsRepo.update(id, { isRead: true });
    }
}
