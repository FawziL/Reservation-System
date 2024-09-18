import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: RegisterDto): Promise<User> {
        const { username, password, email } = createUserDto;

        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

      // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = this.userRepository.create({
            username,
            password: hashedPassword,
            email,
        });

        return this.userRepository.save(newUser);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
