import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user123',
        description: 'Nombre de usuario',
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
