import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

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

    constructor(private router: Router) {}

    ngOnInit() {
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

}