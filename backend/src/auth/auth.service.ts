import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
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
        street: user.street,
        neighborhood: user.neighborhood,
        zip: user.zip,
        photoUrl: user.photoUrl,
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
        street: user.street,
        neighborhood: user.neighborhood,
        zip: user.zip,
        photoUrl: user.photoUrl,
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

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        street: true,
        neighborhood: true,
        zip: true,
        photoUrl: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.street !== undefined && { street: data.street }),
        ...(data.neighborhood !== undefined && { neighborhood: data.neighborhood }),
        ...(data.zip !== undefined && { zip: data.zip }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        street: true,
        neighborhood: true,
        zip: true,
        photoUrl: true,
      },
    });
  }

  async updatePhoto(userId: number, photoUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { photoUrl },
      select: {
        id: true,
        name: true,
        email: true,
        street: true,
        neighborhood: true,
        zip: true,
        photoUrl: true,
      },
    });
  }
}
