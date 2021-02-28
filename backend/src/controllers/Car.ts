import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { Car } from '../models/Car'
import { Marker } from '../models/Marker'

export class CarCtrl {
    async findAll(req: Request, res: Response) {
        const ip = req.get('X-IP-ADDRESS')

        try {
            const carRepo: Repository<Car> = getRepository(Car)
            const items = await carRepo.find()

            const markerRepo: Repository<Marker> = getRepository(Marker)

            const cars = await Promise.
                all(items.map(async item => {
                    const marker = await markerRepo.findOne({ where: { ip, car: item.id }})
                    return { ...item, marked: marker && marker.marked ? marker.marked : false } 
                }))

            res.status(200).json({ cars })
        } catch (error) {
            console.log({ error })
            res.status(500).json({ error })
        }
    }
}
