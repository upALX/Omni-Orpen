import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherResource } from './weather.resource';
import { WeatherRepository } from './weather.repository';

@Module({
    imports: [],
    controllers: [WeatherResource],
    providers: [WeatherController, WeatherRepository],
})
export class WeatherModule {}
