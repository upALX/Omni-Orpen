import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'webhooks'})
export class WebhookModel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'webhook_key', nullable: false})
    @Generated('uuid')
    webhook_key: string;

    @Column({name: 'city', length: 70, nullable: false})
    city: string;
    
    @Column({name: 'country', length: 100, nullable: false})
    country: string;

    @Column({name: 'webhook_url', length: 700, nullable: false})
    webhookURL: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: string;
}