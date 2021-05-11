import { AuthenticationData } from "../../src/model/AuthenticationData";

export class TokenGeneratorMock {
  public generate = (input: AuthenticationData): string => {
    return "token"
  }
}

export default new TokenGeneratorMock()