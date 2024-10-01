import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Usa las rutas importadas
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
.catch(err => console.error(err));
