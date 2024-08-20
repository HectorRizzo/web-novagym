import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";


@Component({
    selector: "app-navbar",
    templateUrl: "navbar.component.html",
    
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ]

})

export class NavbarComponent implements OnInit {
    isCollapsed = true;

    constructor(private router: Router) {}

    ngOnInit() {
    }

    clickRegistro() {
        this.router.navigate(['/registro']);
    }

    clickInicioSesion() {
        this.router.navigate(['/inicio-sesion']);
    }

}