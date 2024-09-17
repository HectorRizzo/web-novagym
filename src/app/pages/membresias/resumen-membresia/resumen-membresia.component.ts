import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { PlanesDto } from "../../../dto/planes.dto";
import { SedesDTO } from "../../../dto/sedes.dto";
import { TerminosCondicionesComponent } from "../../../shared/terminos-condiciones/terminos-condiciones.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-resumen-membresia",
    templateUrl: "./resumen-membresia.component.html",
    styleUrls: ["./resumen-membresia.component.scss"],
    })
export class ResumenMembresiaComponent implements OnInit {
    @Input() membresia: PlanesDto | null = null;
    @Input() sede: SedesDTO | null = null;

    tipoDebito: string = "";
    precio: string = "";

    aceptaTerminos: boolean = false;
    isPago: boolean = false;
    showMembresia: boolean = true;
    constructor(
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.tipoDebito =  this.membresia?.precios[0]?.esRecurrente ? "Cobro Recurrente mes a mes" : "Pago único";
        this.precio = this.membresia?.precios[0]?.precio || "";
    }

    continuar() {
        console.log("continuar");
        if (this.aceptaTerminos) {
            console.log("acepta terminos");
            this.isPago = true;
            this.showMembresia = false;
        } else {
        }
    }

    mostrarTerminos() {
        console.log("acepta terminos ", this.aceptaTerminos);
    this.modalService.open(TerminosCondicionesComponent, { 
        size: "lg",
        scrollable: true,})
        .result.then(
            (result) => {
                console.log("result ", result);
                if (result) {
                    this.aceptaTerminos = true;
                }
            },
            (reason) => {
                console.log("reason ", reason);
            }
        );
    }
}