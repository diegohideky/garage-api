import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Car} from '../entity/Car';
import { items } from '../cars.json'

createConnection().then(async conn => {
    for (const item of items) {
        const car = new Car()
        car.model = item.model
        car.make = item.make
        car.year = item.year
        car.image = item.image && item.image.url ? item.image.url : null

        const saved = await conn.manager.save(car)

        console.log({ saved })
    }

}).catch(error => console.log(error));
