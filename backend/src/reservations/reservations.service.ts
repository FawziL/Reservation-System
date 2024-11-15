import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Table } from '../entities/table.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReservationsService {
    constructor(
        private readonly NotificationsService: NotificationsService,
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

        const savedReservation =
            await this.reservationRepository.save(reservation);

        // Enviar notificación después de crear la reserva
        /*await this.NotificationsService.sendEmail({
            to: user.email, // Usa el correo del usuario
            subject: 'Reservation Confirmation',
            text: `Your reservation for table ${table.tableNumber} on ${savedReservation.reservationDate} has been confirmed.`,
        });*/

        return savedReservation;
    }

    async findAll() {
        return this.reservationRepository.find({
            relations: ['user', 'table'],
        });
    }

    async findByUserID(userID: number) {
        const reservations = await this.reservationRepository.find({
            where: { user: { id: userID } },
            relations: ['user', 'table'],
        });
    
        if (!reservations || reservations.length === 0) {
            throw new NotFoundException('No reservations found for this user');
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
                    ([_, value]) => value !== "" && value !== null && value !== undefined // Ignora valores vacíos
                )
            ),
            table: updateReservationDto.table ? { id: updateReservationDto.table } : reservation.table, 
        };
    
        await this.reservationRepository.save(updatedReservation);
    
        return this.findOne(id);
    }
    
    async remove(id: number) {
        const reservation = await this.reservationRepository.findOne({where: { id }});
        await this.reservationRepository.remove(reservation);
    }
}
