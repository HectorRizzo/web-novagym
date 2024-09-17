import { Component, ElementRef, EventEmitter, Output, ViewChild, AfterViewInit, AfterViewChecked, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
declare var bootstrap: any; // Declaramos `bootstrap` para usar la API de Bootstrap

@Component({
    selector: "app-terminos-condiciones",
    templateUrl: "terminos-condiciones.component.html",
    styleUrls: ["terminos-condiciones.component.scss"]
})
export class TerminosCondicionesComponent  implements OnInit {
    constructor(
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        console.log("terminos condiciones");
    }

    continuar() {
        console.log("continuar");
        this.activeModal.close(true);
    }

    cerrarModal() {
        this.activeModal.close(false);
    }



}