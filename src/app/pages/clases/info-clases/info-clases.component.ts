import { Component, OnDestroy, OnInit } from "@angular/core";
import { clasesDTO } from "../../../dto/clases.dto";
import { SedesService } from "../../../services/sedes.service";
import { ActivatedRoute } from "@angular/router";
import { HorarioDTO } from "../../../dto/horario.dto";

interface Location {
    lat: number;
    lng: number;
    name: string;
    description: string;
  }

@Component({
    selector: "app-info-clases",
    templateUrl: "./info-clases.component.html",
    styleUrls: ["./info-clases.component.scss"]
    })
export class InfoClasesComponent implements OnInit, OnDestroy {
    idClase: number = 0;
    clase: clasesDTO | undefined;
    horarios: HorarioDTO[] = [];
    diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    horas = ['07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00'];
    horasNext = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', '00:00:00'];
    horarioMap = new Map<string, HorarioDTO>();
    constructor(private sedesService: SedesService,
        private activeRoute: ActivatedRoute
    ) { }
    ngOnInit() { 
        this.obtenerClase();
    }

    ngOnDestroy(): void { }

    obtenerClase(){
        this.activeRoute.queryParams.subscribe(params => {
            this.idClase = params['clase'];
            this.sedesService.getClaseById(this.idClase).subscribe((data: clasesDTO) => {
                this.clase = data;
                console.log(this.clase);
            });
        });
        
    }

    
}