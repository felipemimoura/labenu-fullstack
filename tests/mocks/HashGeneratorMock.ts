export class HashGeneratorMock {
  public createHash = async (s: string): Promise<any> => {
    return "hash"
  }
}