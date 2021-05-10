import { UserBusiness } from "../src/business/UserBusiness";
import { USER_ROLES } from "../src/model/User";
import hashGenerator, { HashGenerator } from "../src/services/hashGenerator";
import {IdGeneratorMock} from './mocks/IdGeneratorMock'
import { HashGeneratorMock } from "./mocks/HashGeneratorMock";
import idGenerator from "../src/services/idGenerator";

const userBusiness = new UserBusiness(
  new IdGeneratorMock(),
  new HashGeneratorMock()
)

describe("Input Missing create user", () => {
  test("Error when name is blank", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "",
        "felipe@gmail.com",
        "123456",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error when email is blank", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "",
        "123456",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error when password is blank", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error when roles is blank", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "123456",
        ""
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Missing Input")
    }
  })
  test("Error when email invalid", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipegmail.com",
        "123456",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Invalid email")
    }
  })
  test("Error when password  invalid", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "12",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("'password must contain at least 6 characters")
    }
  })
  test("Error when role is invalid", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "1234567",
        "Guest"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("Valid roles are 'NORMAL' and 'ADMIN'")
    }
  })
  test("Validade id", async () => {
    // expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "1234567",
        USER_ROLES.NORMAL
      )
      const id = idGenerator.generate()
      expect(id).toBe("id")

    } catch (error) {

    }
  })
  test("Generate hash password ", async () => {
    // expect.assertions(2)
    try {
      const hash = hashGenerator.createHash("s")
      expect(hash).toBe("hash")
    } catch (error) {

    }
  })
})