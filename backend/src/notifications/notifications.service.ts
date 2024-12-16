import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

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

    constructor(private readonly notificationsGateway: NotificationsGateway) {}
    // Método para enviar una notificación WebSocket a los administradores
    sendNotification(message: any) {
        this.notificationsGateway.handleNotification(message); // Emite el mensaje a todos los clientes conectados
    }
}
