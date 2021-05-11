import { User } from "../model/User";
import ConnectionDataBase from "./ConnectionDataBase";

export class UserDataBase extends ConnectionDataBase {
  protected tableName: string = "labeInsta_createUser"
  public async createUser(user: User): Promise<void> {
    try {
      await ConnectionDataBase.connection.raw(`
      INSERT INTO ${this.tableName}(id, name, email, nickname, password, role)
      VALUES(
        '${user.getId()}',
        '${user.getName()}',
        '${user.getEmail()}',
        '${user.getNickname()}',
        '${user.getPassword()}',
        '${user.getRole()}'
      )` )
    } catch (error) {
      console.log(error)
      throw new Error(error.sqlMessage || error.message)
    }
  }

}