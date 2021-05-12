import { ImageBusiness } from "../src/business/ImageBusiness";
import { ImageDatabase } from "../src/data/ImageDatabase";
import idGeneratorMock from "./mocks/IdGeneratorMock";
import imageDatabaseMock from "./mocks/imageDataBaseMock"

const imageBusiness = new ImageBusiness(
  idGeneratorMock,
  imageDatabaseMock as ImageDatabase

)

describe("Upload", () => {
  test("Error When subtitle is blank", async () => {
    expect.assertions(2)
    try {
      await imageBusiness.upload(
        "",
        "Felipe",
        "2020-05-12",
        "file"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error When Author is blank", async () => {
    expect.assertions(2)
    try {
      await imageBusiness.upload(
        "Foto da montanha",
        "",
        "2020-05-12",
        "file"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error When Date is blank", async () => {
    expect.assertions(2)
    try {
      await imageBusiness.upload(
        "Foto da montanha",
        "Felipe",
        "",
        "file"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error When file is blank", async () => {
    expect.assertions(2)
    try {
      await imageBusiness.upload(
        "Foto da montanha",
        "Felipe",
        "2020-05-12",
        ""
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error When file is not imagem", async () => {
    expect.assertions(2)
    try {
      await imageBusiness.upload(
        "Foto da montanha",
        "Felipe",
        "2020-05-12",
        "www.google.com"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Check image url")
    }
  })
  test("Success", async () => {
    expect.assertions(1)
    try {
      const { image } = await imageBusiness.upload(
        "Foto da montanha",
        "Felipe",
        "2020-05-12",
        "http://www.google.com"
      )
      expect(image).toBe("Created")

    } catch (error) {

    }
  })
})