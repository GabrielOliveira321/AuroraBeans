import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule, CheckoutModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
