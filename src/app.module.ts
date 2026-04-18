import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { KostFacilityModule } from './kost_facility/kost_facility.module';
import { KostImageModule } from './kost_image/kost_image.module';
import { KostModule } from './kost/kost.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BooksModule, AuthModule, KostFacilityModule, KostImageModule, KostModule, ReviewModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
