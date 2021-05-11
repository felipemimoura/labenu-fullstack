import { Request, Response } from 'express'
import userBusiness from '../business/UserBusiness'


export class UserController {
  public async singup(req: Request, res: Response) {
    try {
      const { name, email, nickname, password, role } = req.body
      const result = await userBusiness.signup(
        name,
        email,
        nickname,
        password,
        role
      )
      res.status(200).send(result)

    } catch (error) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ message })
    }
  }
}

export default new UserController()