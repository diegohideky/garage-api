import { Router } from 'express'
import authentication from './middlewares/authentication'
import parseIPToBody from './middlewares/parse-ip-to-body'
import { CarCtrl } from './controllers/Car'
import { MarkerCtrl } from './controllers/Marker'

const router = Router()

const carCtrl = new CarCtrl()
const markerCtrl = new MarkerCtrl()

router.get('/', authentication, carCtrl.findAll)
router.post('/marker', authentication, parseIPToBody, markerCtrl.save)

export default router
