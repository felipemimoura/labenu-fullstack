import { UserBusiness } from "../src/business/UserBusiness";
import { USER_ROLES } from "../src/model/User";
import hashGenerator from "../src/services/hashGenerator";
import idGeneratorMock from './mocks/IdGeneratorMock'
import { HashGeneratorMock } from "./mocks/HashGeneratorMock";
import userDataBaseMock from "./mocks/userDataBaseMock";
import { UserDataBase } from '../src/data/UserDatabase'
import ConnectionDataBase from "../src/data/ConnectionDataBase";
import tokenGeneratorMock from "./mocks/tokenGeneratorMock";
// import idGenerator from "../src/services/idGenerator";

const userBusiness = new UserBusiness(
  idGeneratorMock,
  new HashGeneratorMock(),
  userDataBaseMock as UserDataBase,
  tokenGeneratorMock
)

describe("Sign up", () => {
  test("Error when name is blank", async () => {
    expect.assertions(2)
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
    expect.assertions(2)
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
    expect.assertions(2)
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
    expect.assertions(2)
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
    expect.assertions(2)
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
  test("Error when password invalid", async () => {
    expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "felipemimoura",
        "12",
        USER_ROLES.NORMAL
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe("'password must contain at least 6 characters'")
    }
  })
  test("Error when role is invalid", async () => {
    expect.assertions(2)
    try {
      await userBusiness.signup(
        "felipe",
        "felipe@gmail.com",
        "felipemimoura",
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
      const id = idGeneratorMock.generate()
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
  test("Connection database ", async () => {
    expect.assertions(1)
    try {
      const result = await ConnectionDataBase.test()
      expect(result[0][0]['1+1']).toBe(2)
    } catch (error) {

    } finally {
      await ConnectionDataBase.destroy()
    }
  })
  test("Success", async () => {
    expect.assertions(1)
    try {
      const { accessToken } = await userBusiness.signup(
        "nome",
        "felipe@teste.com",
        "felipemimoura",
        "1234567",
        "ADMIN"
      )
      expect(accessToken).toBe("token")
    } catch (error) {

    }
  })
})

describe('Login', () => {
  test('Error when email is blank', async () => {
    expect.assertions(2)
    try {
      await userBusiness.login(
        "",
        "123456"
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe('Missing Input')
    }

  })
  test('Error when password is blank', async () => {
    expect.assertions(2)
    try {
      await userBusiness.login(
        "felipe@gmail.com",
        ""
      )
    } catch (error) {
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe('Missing Input')
    }

  })
})
