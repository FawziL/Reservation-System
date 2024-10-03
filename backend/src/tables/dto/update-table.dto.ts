import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
    @ApiProperty({
        example: 'A1',
        description: 'Número de la mesa (opcional)',
        required: false,
    })
    tableNumber?: string;

    @ApiProperty({
        example: 4,
        description: 'Cantidad de asientos en la mesa (opcional)',
        required: false,
    })
    seats?: number;
}
