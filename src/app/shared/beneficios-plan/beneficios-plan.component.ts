import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PlanesDto } from "../../dto/planes.dto";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-beneficios-plan",
    templateUrl: "beneficios-plan.component.html",
    styleUrls: ["beneficios-plan.component.scss"]
})

export class BeneficiosPlanComponent implements OnInit {
    @Input() plan: PlanesDto | null = null;
    @Output() acepta = new EventEmitter<boolean>();
    aceptoTerminos: boolean = false;
    constructor(
        private modalService: NgbActiveModal
    ) {}

    ngOnInit(): void {
    }

    aceptar() {
        if(this.aceptoTerminos) {
        this.acepta.emit(true);
        this.modalService.close();
        } else {
            alert("Debe aceptar los terminos y condiciones");
        }
    }

    rechazar() {
        this.acepta.emit(false);
        this.modalService.close();
    }
}