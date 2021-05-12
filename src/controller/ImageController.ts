import { Request, Response } from 'express'

export class ImageController {
  public async upload(req: Request, res: Response) {
    try {
      const { subtitle, author, date, file } = req.body
      const result = await
    } catch (error) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ message })
    }
  }
}