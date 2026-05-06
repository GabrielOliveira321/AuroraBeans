import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CheckoutDto } from '../auth/dto/checkout.dto';

@Controller()
export class CheckoutController {
  constructor(private readonly authService: AuthService) {}

  @Post('checkout')
  async checkout(@Body() body: CheckoutDto) {
    const checkout = await this.authService.checkout(body);
    console.log(`✅ [SUCESSO] Nova compra finalizada! Cliente: ${body.firstName} ${body.lastName} | Valor: R$ ${body.price}`);
    return {
      message: 'Checkout gravado com sucesso!',
      checkout,
    };
  }
}
