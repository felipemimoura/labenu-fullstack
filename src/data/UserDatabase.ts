import { User } from "../model/User";
import ConnectionDataBase from "./ConnectionDataBase";

export class UserDataBase extends ConnectionDataBase {
  protected tableName: string = "labeInsta_createUser"
  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel && new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.nickname,
        dbModel.password,
        dbModel.role
      )
    )
  }
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
  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await ConnectionDataBase.connection.raw(`
        SELECT * FROM ${this.tableName} WHERE email = '${email}';
      `)
  
      return this.toModel(result[0][0])
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}