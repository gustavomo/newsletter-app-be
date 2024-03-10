class Subscriber {
  public id!: number;
  public email: string;
  public newsletter_id: number;

  constructor(email: string, newsletter_id: number) {
    this.email = email;
    this.newsletter_id = newsletter_id;
  }
}

export default Subscriber;
