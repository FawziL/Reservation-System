import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { Table } from '../entities/table.entity';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Table)
        private readonly tableRepository: Repository<Table>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
    ) {}

    async create(createTableDto: CreateTableDto) {
        const newTable = this.tableRepository.create(createTableDto);
        return await this.tableRepository.save(newTable);
    }

    async findAll() {
        return await this.tableRepository.find();
    }

    async findOne(id: number) {
        return await this.tableRepository.findOne({ where: { id } });
    }

    async update(id: number, updateTableDto: UpdateTableDto) {
        await this.tableRepository.update(id, updateTableDto);
        return this.findOne(id); // Retornar la mesa actualizada
    }

    async remove(id: number) {
        const table = await this.findOne(id);
        if (table) {
            return this.tableRepository.remove(table);
        }
        throw new Error('Table not found');
    }

    async checkAvailability(checkAvailabilityDto: CheckAvailabilityDto) {
        const { date, seats } = checkAvailabilityDto;

        // Obtiene las mesas que tienen el número requerido de asientos o más
        const tables = await this.tableRepository.find({
            where: { seats: seats },
        });

        // Busca reservas existentes en la misma fecha y hora
        const reservations = await this.reservationRepository.find({
            where: { reservationDate: date },
            relations: ['table'],
        });

        // Filtra las mesas disponibles comparando con las reservas
        const availableTables = tables.filter(
            (table) =>
                !reservations.some(
                    (reservation) => reservation.table.id === table.id,
                ),
        );
        return availableTables;
    }
}
