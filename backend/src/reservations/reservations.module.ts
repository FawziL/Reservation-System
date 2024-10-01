import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Table } from '../entities/table.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        UsersModule,
        NotificationsModule,
        TypeOrmModule.forFeature([Reservation, Table]),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})

export class ReservationsModule {}
