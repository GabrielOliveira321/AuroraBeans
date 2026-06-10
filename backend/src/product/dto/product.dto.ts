import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Preço deve ser maior que zero' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  desc: string;

  @IsString()
  @IsNotEmpty({ message: 'URL da imagem é obrigatória' })
  img: string;
}
