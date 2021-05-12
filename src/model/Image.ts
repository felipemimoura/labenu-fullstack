export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private date: string,
    private file: string
  ) { }

  public getId(): string {
    return this.id
  }
  public getSubtitle(): string {
    return this.subtitle
  }

  public getAuthor(): string {
    return this.author
  }

  public getDate(): string {
    return this.date
  }

  public getFile(): string {
    return this.file
  }
}