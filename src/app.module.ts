import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { connection } from 'mongoose';
import { CategoryModule } from './app/apis/category/category.module';
import { FontsModule } from './app/apis/fonts/fonts.module';
import { ProductsModule } from './app/apis/products/products.module';
import { ProductsColorModule } from './app/apis/products-color/products-color.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),

    // Auth
    AuthModule,

    // Controllers
    CategoryModule,
    FontsModule,
    ProductsModule,
    ProductsColorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  logger:Logger = new Logger();

  async onModuleInit() {
    connection.on('connected', () => {
      this.logger.log('MongoDB connected successfully.');
    });

    connection.on('error', (err) => {
      this.logger.error(`MongoDB connection error: ${err}`);
    });

    connection.on('disconnected', () => {
      this.logger.log('MongoDB disconnected.');
    });
  }
}
