import { UserDataBase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { stringToUserRole, User, USER_ROLES } from "../model/User";
import hashGenerator, { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashGenerator: HashGenerator,
    private userDatabase: UserDataBase,
    private tokenGenerator: TokenGenerator
  ) { }
  public async signup(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string = USER_ROLES.NORMAL
  ) {
    try {

      if (!name || !email || !password || !role || !nickname) {
        throw new CustomError(422, "Missing Input")
      }
      if (email.indexOf("@") === -1) {
        throw new CustomError(422, "Invalid email")
      }
      if (password.length < 6) {
        throw new CustomError(422, "'password must contain at least 6 characters'")
      }
      const id = this.idGenerator.generate()
      const cypherPassword = await this.hashGenerator.createHash(password)

      await this.userDatabase.createUser(
        new User(id, name, email, nickname, cypherPassword, stringToUserRole(role))
      )

      const accessToken = this.tokenGenerator.generate({
        id,
        role
      })

      return { accessToken }
    } catch (error) {
      if (error.message.includes("key 'email")) {
        throw new CustomError(409, "Email Already in use")
      }
      throw new CustomError(error.statusCode, error.message)
    }
  }
  public async login(
    email: string,
    password: string
  ) {
    try {

      if (!email || !password) {
        throw new CustomError(422, "Missing Input")
      }
      if (email.indexOf("@") === -1) {
        throw new CustomError(422, "Invalid email")
      }
      const user = await this.userDatabase.getUserByEmail(email)

      if (!user) {
        throw new CustomError(401, "Invalid Credentials")
      }

      const isPasswordCorrect = await this.hashGenerator.compareHash(
        password,
        user.getPassword()
      )
      if (!isPasswordCorrect) {
        throw new CustomError(401, "Invalid Credentials")
      }
    } catch (error) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}

export default new UserBusiness(
  new IdGenerator(),
  new HashGenerator(),
  new UserDataBase(),
  new TokenGenerator()
)