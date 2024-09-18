import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ShopModule } from './pages/shop/shop.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    PagesModule,
    ShopModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
})
export class AppModule { }
