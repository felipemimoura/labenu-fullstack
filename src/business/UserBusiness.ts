import { UserDataBase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { stringToUserRole, User, USER_ROLES } from "../model/User";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashGenerator: HashGenerator,
    private userDatabase: UserDataBase
  ) { }
  public async signup(
    name: string,
    email: string,
    password: string,
    role: string = USER_ROLES.NORMAL
  ) {
     
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
      const cypherPassword = await this.hashGenerator.createHash(password)

      await this.userDatabase.createUser(
        new User(id, name, email, cypherPassword, stringToUserRole(role))
      )



  }
}