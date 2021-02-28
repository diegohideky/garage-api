import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { Car } from '../entity/Car'
import { Marker } from '../entity/Marker'

interface CarProps {
    id: number
    model: string
    make: string
    year: number
    image: string
    marked: boolean
}

export class CarCtrl {
    async findAll(req: Request, res: Response) {
        const ip = req.get('X-IP-ADDRESS')

        try {
            const carRepo: Repository<Car> = getRepository(Car)
            const items = await carRepo.find()

            const markerRepo: Repository<Marker> = getRepository(Marker)

            const cars: CarProps[] = await Promise.
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
