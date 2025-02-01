import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Reservation } from '@/entities/reservation.entity';
import { Table } from '@/entities/table.entity';
import { Notification } from '@/entities/notification.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [User, Reservation, Table, Notification],
            synchronize: true,
        }),
        User,
    ],
})
export class DatabaseModule {}

