import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        example: 'username123',
        description: 'Nombre de usuario para el registro',
    })
    username: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Correo electrónico del usuario',
    })
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'Contraseña del usuario',
    })
    password: string;
}
