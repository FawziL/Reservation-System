import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  // Inyecta el repositorio de User
  ) {}

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find(); 
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id }); 
  }

  // Actualizar un usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto); 
    return this.findOne(id);  
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id); 
  }
}