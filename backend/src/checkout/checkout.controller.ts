import { Controller, Get, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto, CreateOrderDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/user.decorator';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly stripeService: StripeService,
  ) {}

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(@Body() body: CreatePaymentIntentDto) {
    const paymentIntent = await this.stripeService.createPaymentIntent(
      body.amount,
      body.currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('confirm')
  @UseGuards(JwtAuthGuard)
  async confirmOrder(@CurrentUser() user: any, @Body() body: CreateOrderDto) {
    return this.checkoutService.createOrder(user.sub, body);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getOrders(@CurrentUser() user: any) {
    return this.checkoutService.getOrdersByUser(user.sub);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    const event = this.stripeService.constructWebhookEvent(req.rawBody, signature);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as { id: string };
      await this.checkoutService.markOrderPaid(paymentIntent.id);
    }

    return { received: true };
  }
}
