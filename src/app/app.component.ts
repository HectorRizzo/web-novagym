import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { GoogleMapsModule } from "@angular/google-maps";
import { ToastComponent } from './shared/toast/toast.component';
import { filter } from 'rxjs/operators';
import { ShopModule } from './pages/shop/shop.module';
import { UsuariosService } from './services/usuarios.services';

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
    ShopModule,
    RouterModule,
    RouterLink, 
    RouterLinkActive,
  GoogleMapsModule,
  ToastComponent],
  providers: [],
  schemas: [],
  encapsulation: ViewEncapsulation.None // Agrega esta línea si necesitas que los estilos sean globales
})
export class AppComponent {
  title = 'my-app';
  mostrarRegistro = true;
  constructor(public router: Router,
    private viewportScroller: ViewportScroller,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    this.mostrarRegistro = !this.usuarioService.estaLogueado();
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  clickRegistro() {
    this.router.navigate(['/registro']);
  }
}
