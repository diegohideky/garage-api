import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  req.body.ip = req.get('X-IP-ADDRESS')

  next()
}
