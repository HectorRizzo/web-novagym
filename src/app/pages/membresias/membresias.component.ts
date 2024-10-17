import { Component, OnInit } from "@angular/core";
import { MembresiasService } from "../../services/membresias.service";
import { PlanesDto } from "../../dto/planes.dto";
import { SedesService } from "../../services/sedes.service";
import { SedesDTO } from "../../dto/sedes.dto";
import { UsuariosService } from "../../services/usuarios.services";
import { ToastService } from "../../services/toast.services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BeneficiosPlanComponent } from "../../shared/beneficios-plan/beneficios-plan.component";

@Component({
    selector: "app-membresias",
    templateUrl: "membresias.component.html",
    styleUrls: ["membresias.component.scss"]
    })

export class MembresiasComponent implements OnInit {
    mapMembresias: Map<string, PlanesDto[]> = new Map<string, PlanesDto[]>();
    membresiasArray: { key: string, value: any }[] = [];
    showMembresias: boolean = true;
    showResumen: boolean = false;
    sedes: SedesDTO[] = [];

    membresiaSeleccionada: PlanesDto | null = null;
    sedeSeleccionada: SedesDTO | null = null;
    constructor(private membresiasService: MembresiasService,
        private sedesService: SedesService,
        private usuariosService: UsuariosService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getMembresias();
        this.getSedes();
        
    }

    toggleActive(event: Event, sede: SedesDTO) {
        this.sedeSeleccionada = sede;
      }

    selectPlan(event: Event, plan: PlanesDto) {
        this.membresiaSeleccionada = plan;
    }

    getMembresias() {
        this.membresiasService.getMembresias().subscribe({
            next: (data) => {
                console.log("memebresias ", data);
                data.forEach((plan) => {
                    let desc = plan.descripcion.split("\n");
                    plan.informacion = desc;
                    plan.precios.forEach((precio) => {
                        console.log("precio ", precio);
                        precio.tipo = precio.tipo.toUpperCase();
                        if (!this.mapMembresias.has(precio.tipo)) {
                            this.mapMembresias.set(precio.tipo, []);
                        }
                        const membresias = this.mapMembresias.get(precio.tipo);
                        if (membresias) {
                            membresias.push(plan);
                        }
                    });
                });
                console.log("mapMembresias ", this.mapMembresias);
                this.membresiasArray = Array.from(this.mapMembresias, ([key, value]) => ({ key, value }));
                console.log("membresiasArray ", this.membresiasArray);
                
            },
            error: (error) => {
                console.error(error);
            }
        });
        console.log(this.membresiasArray);
    }

    getSedes(){
        this.sedesService.getSedes().subscribe({
          next: (sedes) => {
            this.sedes = sedes;
            console.log('sedes', sedes);
          },
          error: (error) => {
            console.error('Error fetching sedes', error);
          }
        });
      }

    continuar() {
        const isLoggedIn = this.usuariosService.estaLogueado();
        if (!isLoggedIn) {
            this.toastService.showToast('Debe iniciar sesión para continuar', 'error');
            return;
        }
        if(this.membresiaSeleccionada && this.sedeSeleccionada){
            if(this.membresiaSeleccionada.nombre === 'BLACK'){
                this.abrirModal();
            }else{
                this.showMembresias = false;
                this.showResumen = true;
            }
        }
    }

    abrirModal(){
        const modal = this.modalService.open(BeneficiosPlanComponent, { size: 'xl' });
        modal.componentInstance.plan = this.membresiaSeleccionada;
        modal.componentInstance.acepta.subscribe((acepta: boolean) => {
            console.log('acepta ', acepta);
            this.showMembresias = false;
            this.showResumen = true;
        });
        
    }
}