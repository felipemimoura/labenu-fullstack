import { Request, Response } from 'express'
import imageBusiness from '../business/ImageBusiness'

export class ImageController {
  public async upload(req: Request, res: Response) {
    try {
      const { subtitle, author, date, file } = req.body
      const result = await imageBusiness.upload(
        subtitle,
        author,
        date,
        file
      )
    } catch (error) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ message })
    }
  }
}