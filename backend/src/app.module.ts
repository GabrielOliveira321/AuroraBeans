import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
