import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherResource } from './weather.resource';
import { WeatherRepository } from './weather.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
      }),],
    controllers: [WeatherResource],
    providers: [WeatherController, WeatherRepository],
})
export class WeatherModule {}
