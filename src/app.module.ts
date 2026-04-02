import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { KostFacilityModule } from './kost_facility/kost_facility.module';
import { KostImageModule } from './kost_image/kost_image.module';

@Module({
  imports: [BooksModule, AuthModule, KostFacilityModule, KostImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
