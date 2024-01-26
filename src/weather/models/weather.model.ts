import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'weather'})
export class WeatherModel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'weather_key', nullable: false})
    @Generated('uuid')
    weather_key: string

    @Column({name: 'city', length: 70, nullable: false})
    city: string;

    @Column({name: 'country', length: 100, nullable: false})
    country: string;

    @Column({name: 'weather_data', type: 'simple-json', nullable: true })
    weatherData: any

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: string 
}
