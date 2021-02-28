import faker from 'faker'
import { getRepository, Repository } from 'typeorm'
import { Marker } from '../models/Marker'

export class MarkerMock {
    async create(params = {}) {
        const repo: Repository<Marker> = getRepository(Marker)
        return repo.save({
            ip: faker.internet.ip(),
            car: faker.random.uuid(),
            marked: faker.random.arrayElement([true, false]),
            ...params
        })
    }
}
