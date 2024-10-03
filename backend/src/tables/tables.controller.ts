import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @ApiOperation({ summary: 'Crear una nueva mesa' })
    @ApiResponse({ status: 201, description: 'Mesa creada con éxito.' })
    @ApiResponse({ status: 403, description: 'Acceso no autorizado.' })
    @ApiBody({ type: CreateTableDto, description: 'Datos necesarios para crear una nueva mesa' })
    @Post()
    create(@Body() createTableDto: CreateTableDto) {
        return this.tablesService.create(createTableDto);
    }

    @ApiOperation({ summary: 'Comprobar disponibilidad de mesas' })
    @ApiQuery({ name: 'date', description: 'Fecha de la reserva para comprobar disponibilidad', required: true })
    @ApiResponse({ status: 200, description: 'Disponibilidad de mesas verificada.' })
    @ApiResponse({ status: 400, description: 'Datos de disponibilidad inválidos.' })
    @Get('availability')
    checkAvailability(@Query() checkAvailabilityDto: CheckAvailabilityDto) {
        return this.tablesService.checkAvailability(checkAvailabilityDto);
    }

    @ApiOperation({ summary: 'Obtener todas las mesas' })
    @ApiResponse({ status: 200, description: 'Lista de mesas devuelta con éxito.' })
    @Get()
    findAll() {
        return this.tablesService.findAll();
    }

    @ApiOperation({ summary: 'Obtener una mesa por ID' })
    @ApiParam({ name: 'id', description: 'ID de la mesa', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mesa encontrada con éxito.' })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada.' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tablesService.findOne(+id);
    }

    @ApiOperation({ summary: 'Actualizar una mesa por ID' })
    @ApiParam({ name: 'id', description: 'ID de la mesa a actualizar', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mesa actualizada con éxito.' })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada.' })
    @ApiBody({ type: UpdateTableDto, description: 'Datos necesarios para actualizar la mesa' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
        return this.tablesService.update(+id, updateTableDto);
    }

    @ApiOperation({ summary: 'Eliminar una mesa por ID' })
    @ApiParam({ name: 'id', description: 'ID de la mesa a eliminar', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mesa eliminada con éxito.' })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada.' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tablesService.remove(+id);
    }
}
