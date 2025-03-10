import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tableName: string;

    @Column()
    seats: number;

    @OneToMany(() => Reservation, reservation => reservation.table)
    reservations: Reservation[];
}
