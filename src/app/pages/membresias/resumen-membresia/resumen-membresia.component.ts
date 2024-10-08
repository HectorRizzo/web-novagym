import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { PlanesDto } from "../../../dto/planes.dto";
import { SedesDTO } from "../../../dto/sedes.dto";
import { TerminosCondicionesComponent } from "../../../shared/terminos-condiciones/terminos-condiciones.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "../../../dto/product.dto";
import { CartService } from "../../../services/cart.services";
import { ToastService } from "../../../services/toast.services";

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
    aceptaPoliticas: boolean = false;
    isPago: boolean = false;
    showMembresia: boolean = true;
    constructor(
        private modalService: NgbModal,
        private cartService: CartService,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.tipoDebito =  this.membresia?.precios[0]?.esRecurrente ? "Cobro Recurrente mes a mes" : "Pago único";
        this.precio = this.membresia?.precios[0]?.precio || "";
    }

    continuar() {
        console.log("continuar");
        if (this.aceptaTerminos && this.aceptaPoliticas) {
            console.log("acepta terminos");
            this.isPago = true;
            this.guardarMemebresiaCarrito();
            this.showMembresia = false;
        } else {
            this.toastService.showToast("Debe aceptar los términos y condiciones y las políticas de privacidad", "warning");
        }
    }

    mostrarTerminos() {
        console.log("acepta terminos ", this.aceptaTerminos);
    const modalTerminos = this.modalService.open(TerminosCondicionesComponent, { 
        size: "lg",
        scrollable: true,});
        modalTerminos.componentInstance.titulo = "TÉRMINOS Y CONDICIONES";
        modalTerminos.componentInstance.aceptarTerminos = true;
        modalTerminos.componentInstance.aceptarPoliticas = false
        modalTerminos.result.then(
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

    mostrarPoliticas() {
        console.log("acepta terminos ", this.aceptaPoliticas);
    const modlaPoliticas = this.modalService.open(TerminosCondicionesComponent, { 
        size: "lg",
        scrollable: true,})

        modlaPoliticas.componentInstance.titulo = "POLÍTICA DE PROTECCIÓN DE DATOS";
        modlaPoliticas.componentInstance.aceptarTerminos = false;
        modlaPoliticas.componentInstance.aceptarPoliticas = true;
        modlaPoliticas.result.then(
            (result) => {
                console.log("result ", result);
                if (result) {
                    this.aceptaPoliticas = true;
                }
            },
            (reason) => {
                console.log("reason ", reason);
            });
    }


    guardarMemebresiaCarrito() {
        console.log("guardarMemebresiaCarrito");
        let nombre = this.membresia?.precios[0]?.tipo + " " + this.membresia?.nombre;

        let producto:ProductDto = {
            id: this.membresia?.id?.toString() || "",
            name: nombre,
            description: this.membresia?.descripcion || "",
            price: Number(this.membresia?.precios[0]?.precio) || 0,
            cantidad: 1,
            image: this.membresia?.imagen || "",
            category: "membresia",
            stock: 1,
            created_at: new Date(),
            updated_at: new Date(),
            aditionalInfo: {}
        }
        console.log("producto ", producto);
        this.cartService.addToCart(producto);
    }
}