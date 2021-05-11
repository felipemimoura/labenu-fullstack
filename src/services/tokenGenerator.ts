import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthenticationData } from '../model/AuthenticationData'

dotenv.config()

export class TokenGenerator {
  private static expiresIn: number = 9600

  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        role: input.role
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: TokenGenerator.expiresIn
      }
    )
    return newToken
  }
}

