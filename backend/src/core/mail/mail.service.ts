import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
// import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: UserDto, token: string) {
    const url = `http://localhost:3000/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ITC Platform! Confirm your Email',
      template: './confirmation',
      context: {
        url,
      },
    });
  }
}
