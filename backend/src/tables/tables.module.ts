import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from '@/entities/table.entity';
import { Reservation } from '@/entities/reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Table, Reservation])],
    controllers: [TablesController],
    providers: [TablesService],
})

export class TablesModule {}