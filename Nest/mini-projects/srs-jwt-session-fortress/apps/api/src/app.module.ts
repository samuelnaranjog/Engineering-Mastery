import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CardsModule } from './cards/cards.module.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
@Module({
  imports: [AuthModule, CardsModule,  DatabaseModule,  ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
