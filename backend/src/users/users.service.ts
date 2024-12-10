import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, // Inyecta el repositorio de User
    ) {}

    // Obtener todos los usuarios menos el que lo consulta
    async findAll(userID: number): Promise<User[]> {
        return await this.userRepository.find({
            where: { id: Not(userID) }, 
        });
    }

    // Obtener un usuario por ID
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    // Actualizar un usuario
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        // Combina los valores actuales con los nuevos valores del DTO
        const updatedData = Object.entries(updateUserDto).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});
    
        // Actualiza el usuario con los datos combinados
        await this.userRepository.update(id, updatedData);
    
        // Retorna el usuario actualizado
        return this.findOne(id);
    }

    // Eliminar un usuario
    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}