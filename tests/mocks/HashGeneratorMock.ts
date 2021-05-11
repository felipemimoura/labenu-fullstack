export class HashGeneratorMock {
  public createHash = async (s: string): Promise<any> => {
    return "hash"
  }
  public compareHash = async (s: string, hash: string): Promise<boolean> => {
    return s === hash
  }

}

export default new HashGeneratorMock()