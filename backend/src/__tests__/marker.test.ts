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

const ENDPOINT: string = '/marker'
const IP: string = faker.internet.ip()

describe.only('#Marker', (): void => {
    const mockCar = async (): Promise<Car> => carMock.create()
    const mockMarker = async (params): Promise<Marker> => markerMock.create(params)

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
            .post(ENDPOINT)

        expect(status).toBe(401)
        expect(body.message).toBe('no ip provided')
    })

    it('should return 200 with new marker as marked', async (): Promise<void> => {
        const car = await mockCar()

        const { status, body } = await request(app)
            .post(ENDPOINT)
            .set({ 'X-IP-ADDRESS': IP })
            .send({ carId: car.id })

        const { payload } = body

        expect(status).toBe(200)
        expect(payload).toBeInstanceOf(Object)
        expect(typeof payload.id).toBe('string')
        expect(payload.ip).toBe(IP)
        expect(payload.marked).toBeTruthy()
    })

    it('should return 200 with existing marker with marked as false', async (): Promise<void> => {
        const car = await mockCar()
        await mockMarker({ car: car.id, ip: IP, marked: true })

        const { status, body } = await request(app)
            .post(ENDPOINT)
            .set({ 'X-IP-ADDRESS': IP })
            .send({ carId: car.id })

        const { payload } = body

        expect(status).toBe(200)
        expect(payload).toBeInstanceOf(Object)
        expect(typeof payload.id).toBe('string')
        expect(payload.ip).toBe(IP)
        expect(payload.marked).toBeFalsy()
    })

    it('should return 200 with existing marker with marked as true', async (): Promise<void> => {
        const car = await mockCar()
        await mockMarker({ car: car.id, ip: IP, marked: false })

        const { status, body } = await request(app)
            .post(ENDPOINT)
            .set({ 'X-IP-ADDRESS': IP })
            .send({ carId: car.id })

        const { payload } = body

        expect(status).toBe(200)
        expect(payload).toBeInstanceOf(Object)
        expect(typeof payload.id).toBe('string')
        expect(payload.ip).toBe(IP)
        expect(payload.marked).toBeTruthy()
    })
})
