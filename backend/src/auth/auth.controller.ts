import { Controller, Post, Body, Get, Patch, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './user.decorator';

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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.sub);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@CurrentUser() user: any, @Body() body: UpdateProfileDto) {
    const updated = await this.authService.updateProfile(user.sub, body);
    return { message: 'Perfil atualizado com sucesso!', user: updated };
  }

  @Post('profile/photo')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const userId = (req as any).user?.sub || 'unknown';
        const ext = extname(file.originalname);
        cb(null, `user-${userId}-${Date.now()}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return cb(new BadRequestException('Apenas imagens são permitidas.'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async uploadPhoto(@CurrentUser() user: any, @UploadedFile() file: Express.Multer.File) {
    const photoUrl = `/uploads/${file.filename}`;
    const updated = await this.authService.updatePhoto(user.sub, photoUrl);
    return { message: 'Foto atualizada com sucesso!', user: updated };
  }
}
