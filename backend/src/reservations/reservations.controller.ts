import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @ApiOperation({ summary: 'Crear una nueva reserva' })
    @ApiResponse({ status: 201, description: 'Reserva creada con éxito.' })
    @ApiResponse({ status: 403, description: 'Acceso no autorizado.' })
    @ApiBody({ type: CreateReservationDto, description: 'Datos necesarios para crear una nueva reserva' })
    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(createReservationDto);
    }

    @ApiOperation({ summary: 'Obtener todas las reservas' })
    @ApiResponse({ status: 200, description: 'Lista de reservas devuelta con éxito.' })
    @Get()
    findAll() {
        return this.reservationsService.findAll();
    }

    @ApiOperation({ summary: 'Obtener una reserva por ID de usuario' })
    @ApiParam({ name: 'userID', description: 'ID del usuario de la reserva', type: 'string' })
    @ApiResponse({ status: 200, description: 'Reserva encontrada con éxito.' })
    @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
    @Get(':userID')
    findByUserID(@Param('userID') userID: number) {
        return this.reservationsService.findByUserID(userID);
    }

    @ApiOperation({ summary: 'Obtener una reserva por ID' })
    @ApiParam({ name: 'id', description: 'ID de la reserva', type: 'string' })
    @ApiResponse({ status: 200, description: 'Reserva encontrada con éxito.' })
    @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reservationsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Actualizar una reserva por ID' })
    @ApiParam({ name: 'id', description: 'ID de la reserva a actualizar', type: 'string' })
    @ApiResponse({ status: 200, description: 'Reserva actualizada con éxito.' })
    @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
    @ApiBody({ type: UpdateReservationDto, description: 'Datos necesarios para actualizar la reserva' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationsService.update(+id, updateReservationDto);
    }

    @ApiOperation({ summary: 'Eliminar una reserva por ID' })
    @ApiParam({ name: 'id', description: 'ID de la reserva a eliminar', type: 'string' })
    @ApiResponse({ status: 200, description: 'Reserva eliminada con éxito.' })
    @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reservationsService.remove(+id);
    }
}
