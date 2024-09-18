import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-pago",
    templateUrl: "./pago.component.html",
    styleUrls: ["./pago.component.scss"],
})

export class PagoComponent implements OnInit{
    isPago = true;
    @Input() flujo: string = '';

    constructor() { }

    ngOnInit() {
        console.log('PagoComponent initialized');
    }

    continuarPago() {
        this.isPago = false;
    }
}