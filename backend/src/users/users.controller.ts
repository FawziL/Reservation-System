import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Obtener todos los usuarios exceptuando al que hace la solicitud' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta con éxito.' })
    @ApiResponse({ status: 403, description: 'Acceso no autorizado.' })
    @Get()
    findAll(@Request() req: any) {
        const currentUser = req.user.userID; // Usuario autenticado extraído del token
        return this.usersService.findAll(currentUser);
    }

    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado con éxito.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', type: 'string' })
    @ApiBody({ type: UpdateUserDto, description: 'Datos necesarios para actualizar al usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
