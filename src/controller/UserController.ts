import { Request, Response } from 'express'


export class UserController {
  public async singupp(req: Request, res: Response){
    try {
      const {name, role, email, password} = req.body
     
    } catch (error) {
      
    }
  }
}