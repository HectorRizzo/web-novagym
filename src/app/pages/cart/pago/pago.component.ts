import { Component, Input, OnInit } from "@angular/core";
import { UsuariosService } from "../../../services/usuarios.services";

@Component({
    selector: "app-pago",
    templateUrl: "./pago.component.html",
    styleUrls: ["./pago.component.scss"],
})

export class PagoComponent implements OnInit{
    isPago = true;
    @Input() flujo: string = '';
    tarjetas: any[] = [];

    constructor(
        private usuariosService: UsuariosService,
    ) { }

    ngOnInit() {
        console.log('PagoComponent initialized');
        this.obtenerTarjetas();
    }

    continuarPago() {
        this.isPago = false;
    }

    obtenerTarjetas() {
       this.usuariosService.getTarjetas().subscribe({
              next: (data) => {
                console.log("tarjetas ", data);
                this.tarjetas = data;
              },
              error: (error) => {
                console.log("error ", error);
              }
         });
    }

}