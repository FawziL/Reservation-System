import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
