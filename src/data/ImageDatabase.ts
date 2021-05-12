import { Image } from "../model/Image";
import ConnectionDataBase from "./ConnectionDataBase";

export class ImageDatabase extends ConnectionDataBase {
  protected tableName: string = "images"

  public async uploadImage(image: Image): Promise<void> {
    try {
      await ConnectionDataBase.connection.raw(`
        INSERT INTO ${this.tableName}(id, subtitle, author, date, file)
        VALUES(
          '${image.getId()}',
          '${image.getSubtitle()}',
          '${image.getAuthor()}',
          '${image.getDate()}',
          '${image.getFile()}'
        )
      `)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}