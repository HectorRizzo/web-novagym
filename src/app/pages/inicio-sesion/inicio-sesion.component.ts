import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-inicio-sesion",
    templateUrl: "./inicio-sesion.component.html",
    styleUrls: ["./inicio-sesion.component.scss"]
    })

export class InicioSesionComponent implements OnInit{

    iniciarSesion = true;
    constructor(private router: Router) {}
    ngOnInit(): void {
    }

    clickIniciarSesion(){
        //navegar al home
        this.router.navigate(["/home"]);
    }

    clickRegistro(){
        //navegar a registro
        this.router.navigate(["/registro"]);
    }
    

}