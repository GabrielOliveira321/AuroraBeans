import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {
    if (!data.password) throw new UnauthorizedException('Senha é obrigatória');

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new ConflictException('Este email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    });

    const payload = { email: user.email, sub: user.id };
    return {
      message: 'Usuário criado com sucesso!',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: LoginDto) {
    if (!data.password) throw new UnauthorizedException('Senha é obrigatória');

    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      message: 'Login realizado com sucesso!',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async checkout(data: CheckoutDto) {
    const rawCardNumber = data.cardNumber.replace(/\D/g, '');
    const cardLast4 = rawCardNumber.slice(-4);
    const price = Number(data.price);

    return this.prisma.checkout.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        addressNumber: data.addressNumber,
        city: data.city,
        zip: data.zip,
        cardLast4,
        expiry: data.expiry,
        plan: data.plan,
        price,
      },
    });
  }
}
