import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @ApiProperty({
        example: 5,
        description: 'ID de la mesa reservada (opcional)',
        required: false,
    })
    table?: number;
}
