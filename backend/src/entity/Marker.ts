import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from 'typeorm';
import { Car } from './Car';

@Entity()
export class Marker {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    ip: string;

    @OneToOne(type => Car) @JoinColumn()
    car: string;

    @Column()
    marked: boolean;
}
