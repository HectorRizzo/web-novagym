import { Component, OnDestroy, OnInit } from "@angular/core";
import { clasesDTO } from "../../../dto/clases.dto";
import { SedesService } from "../../../services/sedes.service";
import { ActivatedRoute } from "@angular/router";

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