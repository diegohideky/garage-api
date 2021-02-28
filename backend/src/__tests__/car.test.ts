import request from 'supertest'
import faker from 'faker'
import connection from '../config/connnection'

import app from '../app'
import { Car } from '../models/Car'
import { CarMock } from '../mocks/car.mock'
import { Marker } from '../models/Marker'
import { MarkerMock } from '../mocks/marker.mock'

const carMock: CarMock = new CarMock()
const markerMock: MarkerMock = new MarkerMock()

const ENDPOINT: string = '/'
const IP: string = faker.internet.ip()

describe('#Cars', () => {
    const mockCars = async () => {
        const promises = Array(faker.random.number(10)).fill(null).map(async () => carMock.create())
        return Promise.all(promises)
    }

    beforeAll(async (): Promise<void> => {
        await connection.create()
    })

    afterAll(async (): Promise<void> => {
        await connection.clear()
        await connection.close()
    })

    beforeEach(async (): Promise<void> => {
        await connection.clear()
    })

    it('should return 401 when does not pass IP ADDRESS', async () => {
        const { status, body } = await request(app)
            .get(ENDPOINT)

        expect(status).toBe(401)
        expect(body.message).toBe('no ip provided')
    })

    it('should return 200 with cars when pass IP ADDRESS', async () => {
        const cars: Car[] = await mockCars()

        const { status, body } = await request(app)
            .get(ENDPOINT)
            .set({ 'X-IP-ADDRESS': IP })

        expect(status).toBe(200)
        expect(body).toHaveProperty('cars')
        expect(body.cars).toBeInstanceOf(Array)
        expect(body.cars).toHaveLength(cars.length)
        body.cars.forEach((car) => {
            expect(typeof car.id).toBe('string')
            expect(typeof car.model).toBe('string')
            expect(typeof car.make).toBe('string')
            expect(typeof car.year).toBe('number')
            expect(typeof car.image).toBe('string')
            expect(car.marked).toBeFalsy()
        })
    })

    it('should return cars with marked true when it is liked', async () => {
        const cars: Car[] = await mockCars()

        const [firstCar, secondCar] = cars

        const promises = [firstCar, secondCar].map(async (car) => {
            return markerMock.create({ ip: IP, car: car.id, marked: true })
        })

        const markers: Marker[] = await Promise.all(promises)

        expect(markers).toHaveLength(2)
        markers.forEach((marker) => {
            expect(typeof marker.id).toBe('string')
            expect(marker.ip).toBe(IP)
            expect(typeof marker.car).toBe('string')
            expect(marker.marked).toBeTruthy()
        })

        const { status, body } = await request(app)
            .get(ENDPOINT)
            .set({ 'X-IP-ADDRESS': IP })

        expect(status).toBe(200)
        expect(body).toHaveProperty('cars')
        expect(body.cars).toBeInstanceOf(Array)
        expect(body.cars).toHaveLength(cars.length)
        body.cars.forEach((car) => {
            expect(typeof car.id).toBe('string')
            expect(typeof car.model).toBe('string')
            expect(typeof car.make).toBe('string')
            expect(typeof car.year).toBe('number')
            expect(typeof car.image).toBe('string')

            if ([firstCar.id, secondCar.id].includes(car.id)) {
                expect(car.marked).toBeTruthy()
            } else {
                expect(car.marked).toBeFalsy()
            }
        })
    })
})
