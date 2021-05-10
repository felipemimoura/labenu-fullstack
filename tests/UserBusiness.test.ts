import { UserBusiness } from "../src/business/UserBusiness";
import { USER_ROLES } from "../src/model/User";

const userBusiness = new UserBusiness()

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
})