import { ApiProperty } from '@nestjs/swagger';

export class CheckAvailabilityDto {
    @ApiProperty({
        example: '2024-10-02T18:00:00Z',
        description: 'Fecha y hora para verificar la disponibilidad',
    })
    date: Date;

    @ApiProperty({
        example: 'A1',
        description: 'Número de la mesa a verificar',
    })
    tableNumber: string;

    @ApiProperty({
        example: 4,
        description: 'Número de asientos requeridos',
    })
    seats: number;
}
