import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Table } from './table.entity';  // Usamos Table en lugar de Room

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservationDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Table, table => table.reservations)
  table: Table;  // Cambiamos Room por Table
}
