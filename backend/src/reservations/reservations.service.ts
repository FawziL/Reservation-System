import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UsersService } from '@/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '@/entities/reservation.entity';
import { Table } from '@/entities/table.entity';
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationsGateway } from '@/notifications/notifications.gateway'; // Importar el gateway
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class ReservationsService {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly notificationsGateway: NotificationsGateway, // Inyectar el gateway
        private readonly usersService: UsersService,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Table)
        private readonly tableRepository: Repository<Table>,
    ) {}

    async create(createReservationDto: CreateReservationDto) {
        const user = await this.usersService.findOne(
            createReservationDto.userID,
        );
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const table = await this.tableRepository.findOne({
            where: { id: createReservationDto.table },
        });
        if (!table) {
            throw new NotFoundException('Table not found');
        }

        const reservation = this.reservationRepository.create({
            reservationDate: createReservationDto.reservationDate,
            user: user,
            table: { id: createReservationDto.table },
        });

        const savedReservation = await this.reservationRepository.save(reservation);

        const fecha = new Date(reservation.reservationDate);
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; 
        const dia = fecha.getDate();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();

        // Enviar notificación por email
        await this.notificationsService.sendEmail({
            to: user.email,
            subject: 'Reservation Confirmation',
            html: 
            `
                <p>Your reservation for table <strong>${table.tableNumber}</strong> on <strong>${dia}/${mes}/${anio} ${horas}:${minutos}</strong> has been created.</p>
                    
                <p>Please, click the link below to confirm your reservation:</p>
                <p
                    <a href="${process.env.CORS_ORIGIN}/confirm-reservation?token=${JwtUtil.generateConfirmationToken(reservation.id)}" 
                        style="background-color:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
                        Confirm Reservation
                    </a>
                </p>
            `,
        });

        const notification = 
        {
            message: `Nueva reservación creada por ${user.username} para la mesa ${table.tableNumber} el ${dia}/${mes}/${anio} ${horas}:${minutos}.`,
            reservationId: reservation.id,
            userId: user.id,
        }
        // Enviar notificación en tiempo real a través del gateway
        this.notificationsGateway.handleNotification(notification);
        // Guardar notificación en caso no haya admin conectado
        this.notificationsService.createNotification(notification);

        return reservation;
    }

    async findAll() {
        const reservations = await this.reservationRepository.find({
            relations: ['user', 'table'],
        });

        return reservations.map((reservation) => ({
            ...reservation,
            user: {
                id: reservation.user.id,
                username: reservation.user.username,
                email: reservation.user.email,
            },
            table: reservation.table, 
        }));
    }

    async findByUserID(userID: number) {
        const reservations = await this.reservationRepository.find({
            where: { user: { id: userID } },
            relations: ['user', 'table'],
        });

        if (!reservations || reservations.length === 0) {
            return [];
        }

        return reservations;
    }

    async findOne(id: number) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['user', 'table'],
        });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        return reservation;
    }

    async update(id: number, updateReservationDto: UpdateReservationDto) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
        });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        // Filtra los campos vacíos y mezcla con los datos existentes
        const updatedReservation = {
            ...reservation,
            ...Object.fromEntries(
                Object.entries(updateReservationDto).filter(
                    ([_, value]) =>
                        value !== '' && value !== null && value !== undefined,
                ),
            ),
            table: updateReservationDto.table
                ? { id: updateReservationDto.table }
                : reservation.table,
        };

        await this.reservationRepository.save(updatedReservation);

        return this.findOne(id);
    }

    async remove(id: number) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
        });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        await this.reservationRepository.remove(reservation);
    }
    
    async confirmReservation(token: string) {
        try {
            const decoded = JwtUtil.verifyToken(token);

            if (!decoded || !decoded.reservationId) {
                throw new BadRequestException('Invalid or expired token');
            }

            const reservation = await this.reservationRepository.findOne({
                where: { id: decoded.reservationId },
            });

            if (!reservation) {
                throw new NotFoundException('Reservation not found');
            }

            reservation.status = 'confirmed';
            return await this.reservationRepository.save(reservation);
        } catch (error) {
            throw new BadRequestException('Invalid or expired token');
        }
    }
}
