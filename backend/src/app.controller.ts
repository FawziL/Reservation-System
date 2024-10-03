import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app') // Agrupa los endpoints bajo la etiqueta 'app'
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({ summary: 'Obtener un mensaje de bienvenida' }) // Describe la operación del endpoint
    @ApiResponse({ status: 200, description: 'Mensaje obtenido con éxito.' }) // Respuesta exitosa
    @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Error potencial
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
