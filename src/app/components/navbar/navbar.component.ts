import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UsuariosService } from "../../services/usuarios.services";
import { ToastService } from "../../services/toast.services";

@Component({
    selector: "app-navbar",
    templateUrl: "navbar.component.html",
    styleUrls: ["navbar.component.scss"],
    
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        CommonModule
    ]

})

export class NavbarComponent implements OnInit {
  showMenu = false;
  isLoggedIn: boolean = false;

    constructor(private router: Router,
      private usuarioService: UsuariosService,
      private toastService: ToastService
    ) {}

    ngOnInit() {
      this.usuarioService.getIsLoggedIn().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
      }
    

    clickRegistro() {
        this.router.navigate(['/registro']);
    }

    clickInicioSesion() {
        this.router.navigate(['/inicio-sesion']);
    }


    toggleNavbar(event: MouseEvent) {
        event.stopPropagation();
        this.showMenu = !this.showMenu;
    }


    closeMenu() {
      console.log('closeMenu');
      this.showMenu = false;
    }

    clickLogout() {
      this.usuarioService.logout();
      this.toastService.showToast('Sesión cerrada', 'success');
      //recargar la página
      window.location.reload();
    }

}