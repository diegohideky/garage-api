import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const ip = req.get('X-IP-ADDRESS')

  if (!ip) {
    return res.status(401).json({ message: 'no ip provided'})
  }

  next()
}
