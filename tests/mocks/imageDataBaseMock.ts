import { Image } from "../../src/model/Image";

export class ImageDatabaseMock {
  public async uploadImage(image: Image): Promise<void> {

  }
}

export default new ImageDatabaseMock()