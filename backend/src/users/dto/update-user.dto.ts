import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'user123',
        description: 'Nombre de usuario (opcional)',
        required: false,
    })
    username?: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Correo electrónico del usuario (opcional)',
        required: false,
    })
    email?: string;

    @ApiProperty({
        example: 'password123',
        description: 'Contraseña del usuario (opcional)',
        required: false,
    })
    password?: string;
}
