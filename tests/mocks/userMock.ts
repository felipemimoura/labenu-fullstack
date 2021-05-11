import { User, USER_ROLES } from "../../src/model/User";

export const normalUserMock = new User(
  "id",
  "name",
  "normal@gmail.com",
  "normal",
  "normalpassword",
  USER_ROLES.NORMAL
)