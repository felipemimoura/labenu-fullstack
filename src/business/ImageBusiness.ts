import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "../services/idGenerator";

export class ImageBusiness {
  constructor(
    private idGenerator: IdGenerator
  ) { }

  public async upload(
    subtitle: string,
    author: string,
    date: string,
    file: string
  ) {
    try {
      if (!subtitle || !author || !date || !file) {
        throw new CustomError(422, "Missing Input")
      }
      if (file.indexOf("http") === -1) {
        throw new CustomError(422, "Check image url")
      }
      const id = this.idGenerator.generate()


    } catch (error) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}

export default new ImageBusiness(
  new IdGenerator()
)