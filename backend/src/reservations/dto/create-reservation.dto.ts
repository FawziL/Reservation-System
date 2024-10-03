import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    @ApiProperty({
        example: 1,
        description: 'ID del usuario que realiza la reserva',
    })
    userID: number;

    @ApiProperty({
        example: '2024-10-02T18:00:00Z',
        description: 'Fecha y hora de la reserva',
    })
    date: Date;

    @ApiProperty({
        example: 5,
        description: 'ID de la mesa reservada',
    })
    table: number;
}
