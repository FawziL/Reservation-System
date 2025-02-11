import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { NotificationsService } from '@/notifications/notifications.service';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly notificationsService: NotificationsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: RegisterDto): Promise<User> {
        const { username, password, email } = createUserDto;

        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
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
        const payload = {
            username: user.username,
            userID: user.id,
            admin: user.isAdmin,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async requestPasswordReset(email: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Generar un token temporal para la recuperación de contraseña
        const resetToken = this.jwtService.sign(
            { userId: user.id },
            { expiresIn: '1h' }, // El token expira en 1 hora
        );

        // Enviar el correo con el enlace de recuperación
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
        await this.notificationsService.sendEmail({
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: `
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetUrl}">
                    <button>Restablecer contraseña</button>
                </a>
                <p>Este enlace expirará en 1 hora.</p>
            `,
        });
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        console.log(token, console)
        // Verificar el token
        const payload = JwtUtil.verifyToken(token);
        if (!payload || !payload.userId) {
            throw new Error('Invalid or expired token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Actualizar la contraseña y limpiar el token
        
        await this.usersService.update(payload.userId, {
            password: hashedPassword, 

        });
    }
}
