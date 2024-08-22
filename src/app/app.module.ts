import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class AppModule { }
