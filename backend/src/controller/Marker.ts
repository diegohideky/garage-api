import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { Marker } from '../entity/Marker'

export class MarkerCtrl {
    async save(req: Request, res: Response) {
        const { ip, carId } = req.body
        try {
            const repository: Repository<Marker> = getRepository(Marker)

            const found = await repository.findOne({ where: { car: carId } })

            const payload = !found
                ? await repository.save({ ip, car: carId, marked: true })
                : await repository.save({ ...found, marked: !found.marked })

            return res.status(200).json({ payload })
        } catch (error) {
            console.log({ error })
            res.status(500).json({ error })
        }
    }
}
