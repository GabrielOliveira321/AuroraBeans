import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderDto } from './dto/payment.dto';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, data: CreateOrderDto) {
    const simulatedId = data.stripePaymentId || `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const last4 = data.cardLast4 || '9876';

    const order = await this.prisma.order.create({
      data: {
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        addressNumber: data.addressNumber,
        city: data.city,
        zip: data.zip,
        cardLast4: last4,
        expiry: data.expiry || '12/28',
        plan: data.plan,
        price: data.price,
        stripePaymentId: simulatedId,
        status: 'paid',
      },
    });

    return { message: 'Pedido realizado com sucesso! 🎉', order };
  }

  async markOrderPaid(stripePaymentId: string) {
    const order = await this.prisma.order.findFirst({
      where: { stripePaymentId },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com payment ID ${stripePaymentId} não encontrado.`);
    }

    return this.prisma.order.update({
      where: { id: order.id },
      data: { status: 'paid' },
    });
  }

  async getOrdersByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
