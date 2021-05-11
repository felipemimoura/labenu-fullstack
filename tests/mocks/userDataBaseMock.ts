import { CustomError } from "../../src/errors/CustomError";
import { User } from "../../src/model/User";
import { normalUserMock } from "./userMock";

export class UserDatabase {

  public async createUser(user: User): Promise<void> {

  }

  public async getUserByEmail(email: string) {
    if (email === normalUserMock.getEmail()) return normalUserMock
  }

}

export default new UserDatabase()