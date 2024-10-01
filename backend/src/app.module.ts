import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';  // Importa tu nuevo módulo de base de datos
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
    imports: [DatabaseModule, AuthModule, UsersModule, ReservationsModule, TablesModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
