import { ApiProperty } from '@nestjs/swagger';

export class ConfirmReservationDto {
    @ApiProperty({ description: 'Token de confirmación de la reserva', example: 'eyJhbGciOiJIUzI1NiIsIn...' })
    token: string;
}
