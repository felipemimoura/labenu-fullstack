import { CustomError } from "../errors/CustomError";
import { USER_ROLES } from "../model/User";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashGenerator: HashGenerator
  ) { }
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
      if (password.length < 6) {
        throw new CustomError(422, "'password must contain at least 6 characters")
      }
      const id = this.idGenerator.generate()

    } catch (error) {

    }
  }
}