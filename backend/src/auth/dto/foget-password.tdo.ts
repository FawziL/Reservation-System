import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
    @ApiProperty({
        example: '3213qsdsdgddd',
        description: 'Token emitido desde el servidor al correo registrado',
    })
    token: string;

    @ApiProperty({
        example: 'password123',
        description: 'Nueva contraseña del usuario',
    })
    newPassword: string;
}
