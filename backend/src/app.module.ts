import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        ReservationsModule,
        TablesModule,
        NotificationsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
