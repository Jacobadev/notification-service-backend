import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, body: string) {
    console.log(`Email sent to ${to} with subject "${subject}" and body "${body}"`);
    return Promise.resolve();
  }
}
