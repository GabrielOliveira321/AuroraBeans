import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContactDto, SubscribeNewsletterDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(data: CreateContactDto) {
    const contact = await this.prisma.contact.create({ data });
    return {
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      contact,
    };
  }

  async subscribeNewsletter(data: SubscribeNewsletterDto) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (!existing.active) {
        await this.prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { active: true, name: data.name || existing.name },
        });
        return { message: 'Inscrição reativada! Bem-vindo de volta.' };
      }
      throw new ConflictException('Este email já está inscrito na newsletter.');
    }

    const subscriber = await this.prisma.newsletterSubscriber.create({
      data: {
        email: data.email,
        name: data.name || null,
      },
    });

    return {
      message: 'Inscrição realizada com sucesso! Agora você receberá novidades e ofertas exclusivas.',
      subscriber,
    };
  }
}
