import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createMany(@Body() body: CreateProductDto | CreateProductDto[]) {
    // Retorna a quantidade de produtos inseridos
    return this.productService.createMany(body);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 12,
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
