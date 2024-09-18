import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ShopModule } from './pages/shop/shop.module';

@NgModule({
  declarations: [
  ],
  imports: [
    PagesModule,
    ShopModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class AppModule { }
