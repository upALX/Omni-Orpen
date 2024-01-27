import { Module, ValidationPipe } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService]
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
