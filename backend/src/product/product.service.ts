import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createMany(input: CreateProductDto | CreateProductDto[]) {
    try {
      // Se o usuário mandar apenas um objeto (em vez de um array), transformamos em array automaticamente
      const products = Array.isArray(input) ? input : [input];

      const productNames = products.map((p) => p.name);

      const existingProducts = await this.prisma.product.findMany({
        where: {
          name: {
            in: productNames,
          },
        },
      });

      if (existingProducts.length > 0) {
        const namesAlreadyExist = existingProducts.map((p) => p.name).join(', ');
        console.log(`[ERRO] Tentativa de inserir produtos duplicados: ${namesAlreadyExist}`);
        throw new ConflictException(`Não foi possível salvar a lista. Os seguintes produtos já existem no banco de dados: ${namesAlreadyExist}`);
      }

      return await this.prisma.product.createMany({
        data: products,
      });
    } catch (error) {
      console.log('[ERRO FATAL] Falha no createMany:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      console.log('[ERRO FATAL] Falha ao buscar todos os produtos:', error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      
      if (!product) {
        console.log(`[ERRO] Tentativa de buscar produto inexistente com o ID: ${id}`);
        throw new NotFoundException('Produto não encontrado.');
      }
      
      return product;
    } catch (error) {
      console.log(`[ERRO FATAL] Falha ao buscar o produto ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        console.log(`[ERRO] Tentativa de deletar produto inexistente com o ID: ${id}`);
        throw new NotFoundException('Produto não encontrado para deleção.');
      }

      await this.prisma.product.delete({
        where: { id },
      });

      return { message: 'Produto deletado com sucesso!' };
    } catch (error) {
      console.log(`[ERRO FATAL] Falha ao deletar o produto ${id}:`, error);
      throw error;
    }
  }
}
