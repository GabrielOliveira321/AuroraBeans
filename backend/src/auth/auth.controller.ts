import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('checkout')
  async checkout(@Body() body: CheckoutDto) {
    const checkout = await this.authService.checkout(body);
    return {
      message: 'Checkout gravado com sucesso!',
      checkout,
    };
  }
}
