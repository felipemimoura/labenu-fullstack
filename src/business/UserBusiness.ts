import { CustomError } from "../errors/CustomError";

export class UserBusiness {
  constructor() { }
  public async signup(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      if (!name || !email || !password || !role) {
        throw new CustomError(422, "Missing Input")
      }
      if (email.indexOf("@") === -1) {
        throw new CustomError(422, "Invalid email")
      }

    } catch (error) {

    }
  }
}