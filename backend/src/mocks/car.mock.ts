import faker from 'faker'
import { getRepository, Repository } from 'typeorm'
import { Car } from '../models/Car'

export class CarMock {
    async create(params = {}) {
        const repo: Repository<Car> = getRepository(Car)
        return repo.save({
            model: faker.commerce.product(),
            make: faker.name.firstName(),
            year: faker.random.number({ min: 1940, max: 2021 }),
            image: faker.internet.url(),
            ...params
        })
    }
}
