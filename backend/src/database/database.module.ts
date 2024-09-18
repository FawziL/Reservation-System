import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Reservation } from '../entities/reservation.entity';
import { Table } from '../entities/table.entity'; 
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
      entities: [User, Reservation, Table], // las tablas
      synchronize: true,
    }),
    User,  // Asegúrate de que el UsersModule esté importado
  ],
})
export class DatabaseModule {}

