import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, SubscribeNewsletterDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContact(@Body() body: CreateContactDto) {
    return this.contactService.createContact(body);
  }

  @Post('newsletter')
  async subscribeNewsletter(@Body() body: SubscribeNewsletterDto) {
    return this.contactService.subscribeNewsletter(body);
  }
}
