import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Table } from '../entities/table.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const user = await this.usersService.findOne(createReservationDto.userID);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(createReservationDto.table)
  const table = await this.tableRepository.findOne({ where: { id: createReservationDto.table } });

  if (!table) {
    throw new NotFoundException('Table not found');
  }

    const reservation = this.reservationRepository.create({
      reservationDate: createReservationDto.date,
      user: user, // Asignar el objeto User
      table: { id: createReservationDto.table }, // Asumiendo que `table` es un ID
    });

    return this.reservationRepository.save(reservation);
  }

  async findAll() {
    return this.reservationRepository.find({ relations: ['user', 'table'] });
  }

  /*async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne(id, { relations: ['user', 'table'] });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    await this.findOne(id); // Verifica que la reserva exista
    await this.reservationRepository.update(id, updateReservationDto);
    return this.findOne(id); // Retorna la reserva actualizada
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }*/
}
