import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    model: string;

    @Column()
    make: string;

    @Column()
    year: number;

    @Column({ nullable: true })
    image: string;
}
