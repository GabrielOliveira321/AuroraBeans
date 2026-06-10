import { IsString, IsEmail, IsOptional, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Nome muito longo' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty({ message: 'Assunto é obrigatório' })
  @MinLength(3, { message: 'Assunto deve ter pelo menos 3 caracteres' })
  @MaxLength(200, { message: 'Assunto muito longo' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  @MinLength(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' })
  @MaxLength(2000, { message: 'Mensagem muito longa (máx. 2000 caracteres)' })
  message: string;
}

export class SubscribeNewsletterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Nome muito longo' })
  name?: string;
}
