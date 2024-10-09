import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit, Renderer2 } from "@angular/core";
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
      private toastService: ToastService,
      private renderer: Renderer2
    ) {}

    ngOnInit() {
      this.usuarioService.getIsLoggedIn().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
      }
    

    clickRegistro() {
        this.router.navigate(['/registro']);
        this.collapseMenu();
    }

    clickInicioSesion() {
        this.router.navigate(['/inicio-sesion']);
        this.collapseMenu();
    }

    collapseMenu() {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
  
      if (navbarToggler && navbarCollapse) {
        this.renderer.removeClass(navbarCollapse, 'show');
        this.renderer.setAttribute(navbarToggler, 'aria-expanded', 'false');
      }
    }



    // toggleNavbar(event: MouseEvent) {
    //     event.stopPropagation();
    //     this.showMenu = !this.showMenu;
    // }


    // closeMenu() {
    //   console.log('closeMenu');
    //   this.showMenu = false;
    // }

    clickLogout() {
      this.usuarioService.logout();
      this.toastService.showToast('Sesión cerrada', 'success');
      this.collapseMenu();
      //recargar la página
      window.location.reload();
    }

}