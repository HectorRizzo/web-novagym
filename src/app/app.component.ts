import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    PagesModule, 
    RouterModule,
    RouterLink, 
    RouterLinkActive,
  GoogleMapsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None // Agrega esta línea si necesitas que los estilos sean globales

   // Agrega esta línea
})
export class AppComponent {
  title = 'my-app';

  constructor(public router: Router) {}

  ngOnInit() {
    // this.router.navigate(['/home']);
  }

  clickRegistro() {
    this.router.navigate(['/registro']);
  }
}
