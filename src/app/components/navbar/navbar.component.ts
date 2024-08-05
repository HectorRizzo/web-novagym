import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


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

    constructor() {}

    ngOnInit() {
    }
}