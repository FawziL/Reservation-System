import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    message: string;

    @Column()
    reservationId: number;

    @Column()
    userId: number;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
