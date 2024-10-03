import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
    @ApiProperty({
        example: 'A1',
        description: 'Número de la mesa',
    })
    tableNumber: string;

    @ApiProperty({
        example: 4,
        description: 'Cantidad de asientos en la mesa',
    })
    seats: number;
}
