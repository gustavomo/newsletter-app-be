class Newsletter {
  public id!: number;
  public content: string;
  public file_url: string;
  public subject: string;

  constructor(subject: string, content: string, file_url: string) {
    this.content = content;
    this.file_url = file_url;
    this.subject = subject;
  }
}

export default Newsletter;
