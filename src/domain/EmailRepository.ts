export type TSendEmailParams = {
  from: string;
  html: string;
  subject: string;
  to: string;
  url: string;
};

export interface EmailRepository {
  sendEmail(params: TSendEmailParams): Promise<void>;
}
