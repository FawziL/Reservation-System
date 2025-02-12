import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, Query  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/foget-password.tdo';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Registro de un nuevo usuario' })
    @ApiBody({ type: RegisterDto, description: 'Datos necesarios para registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado con éxito.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    @Post('register')
    async register(@Body() createUserDto: RegisterDto): Promise<User> {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Inicio de sesión' })
    @ApiBody({ type: LoginDto, description: 'Credenciales para iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
    @HttpCode(HttpStatus.OK) // Especifica el código de estado 200
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = loginDto;
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return this.authService.login(user);
    }

    @ApiOperation({ summary: 'Envio del correo para recuperación de contraseña' })
    @ApiParam({ name: 'email', description: 'Email del usuario que desea recuperar contraseña', type: 'string' })
    @ApiResponse({ status: 200, description: 'Se envió con éxito el correo electrónico.' })
    @HttpCode(HttpStatus.OK) // Especifica el código de estado 200
    @ApiResponse({ status: 500, description: 'Correo electrónico no válido.' })
    @Post('request-password-reset')
    async requestPasswordReset(@Body('email') email: string): Promise<void> {
        await this.authService.requestPasswordReset(email);
    }

    @ApiOperation({ summary: 'Recuperación de contraseña Usuario' })
    @ApiBody({ type: ForgetPasswordDto, description: 'Datos necesarios para recuperar la contraseña' })
    @ApiResponse({ status: 201, description: 'Nueva contraseña registrada con éxito.' })
    @ApiResponse({ status: 400, description: 'Token o contraseña no válida.' })
    @Post('reset-password')
    async resetPassword(@Body()createNewPassword:ForgetPasswordDto): Promise<void> {
        await this.authService.resetPassword(createNewPassword);
    }
}
