import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
    });
    
    const config = new DocumentBuilder()
        .setTitle('Sistema de Reservas')
        .setDescription('API para manejar las reservas de mesas')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, document); // URL donde se puede acceder a la documentación

    await app.listen(8080);
}
bootstrap();
