import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({
        example: "La reserva ha sido solicitado el dia tal a las horas tal por tal",
        description: 'Mensaje de la notificacion',
    })
    message: string;

    @ApiProperty({
        example: 1,
        description: 'ID del usuario que realiza la reserva',
    })
    userId: number;

    @ApiProperty({
        example: 5,
        description: 'Id de la reserva',
    })
    reservationId: number;
}