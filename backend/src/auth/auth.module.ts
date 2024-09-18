import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // Reemplaza con tu clave secreta
      signOptions: { expiresIn: '60s' }, // Configura según tus necesidades
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Si necesitas exportar el servicio para usarlo en otros módulos
})
export class AuthModule {}