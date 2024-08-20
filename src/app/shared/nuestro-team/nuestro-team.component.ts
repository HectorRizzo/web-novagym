import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-nuestro-team",
    templateUrl: "./nuestro-team.component.html",
    styleUrls: ["./nuestro-team.component.scss"]
    })
export class NuestroTeamComponent implements OnInit {
    constructor(private router: Router) {}


    ngOnInit(): void {
    }

    clickRegistro(){
        //navegar a registro
        this.router.navigate(["/registro"]);
    }
}