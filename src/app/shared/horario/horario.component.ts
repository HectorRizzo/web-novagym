import { Component, Input, OnInit } from "@angular/core";
import { SedesService } from "../../services/sedes.service";
import { SedesDTO } from "../../dto/sedes.dto";
import { clasesDTO } from "../../dto/clases.dto";
import { HorarioDTO } from "../../dto/horario.dto";

@Component({
    selector: "app-horario",
    templateUrl: "horario.component.html",
    styleUrls: ["horario.component.scss"]
    })
export class HorarioComponent implements OnInit {
    sedes: SedesDTO[] = [];
    clases: clasesDTO[] = [];
    mapClasesXSede: Map<number, clasesDTO[]> = new Map<number, clasesDTO[]>();
    horariosBase: HorarioDTO[] = [];
    horarios: HorarioDTO[] = [];
    diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    horas = ['07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00'];
    horasNext = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', '00:00:00'];
    horarioMap = new Map<string, HorarioDTO>();

    @Input() mostrarSedes: boolean = false;
    constructor(private sedesService: SedesService) {

     }

    ngOnInit() {
        this.getDataHorarios();
        this.obtenerClases();
        this.getSedes();
    }


    getSedes(){
        this.sedesService.getSedes().subscribe({
          next: (sedes) => {
            this.sedes = sedes;
            console.log('sedes', sedes);
            this.sedes.forEach(sede => {
              this.obtenerClasesXSede(sede.nombre, sede.id);
            });
          },
          error: (error) => {
            console.error('Error fetching sedes', error);
          }
        });
    }

    obtenerClases(){
        this.sedesService.getClases().subscribe({
          next: (clases) => {
            console.log('clases', clases);
            this.clases = clases;
            let crossfit = new clasesDTO( 2, 'Crossfit', 'Clase de crossfit',this.clases[0].sede);
            let todos = new clasesDTO( 999, 'Todas', 'TODAS',this.clases[0].sede);
            this.clases.unshift(todos);
            this.clases.push(crossfit);
          },
          error: (error) => {
            console.error('Error fetching clases', error);
          }
        });
      }
    
      obtenerClasesXSede(clase: string, idSede: number){
        this.sedesService.getClasesSede(clase, idSede).subscribe({
          next: (clases) => {
            console.log('clases', clases);
            this.mapClasesXSede.set(idSede, clases);
          },
          error: (error) => {
            console.error('Error fetching clases', error);
          }
        });
    }

    getHorario() {
        const horasSet = new Set<string>();
        this.horarios.forEach(horario => {
            horasSet.add(horario.horario_inicio);
            horasSet.add(horario.horario_fin);  
        });
        this.horas = Array.from(horasSet).sort();
        this.horasNext = this.horas.map((hora, index) => this.horas[index + 1] || '00:00:00');
    
        this.horarios.forEach(horario => {
          //validar si esta entre dos filas de horas
          if (this.horas.includes(horario.horario_inicio) && this.horas.includes(horario.horario_fin)) {
            const indexInicio = this.horas.indexOf(horario.horario_inicio);
            const indexFin = this.horas.indexOf(horario.horario_fin);
            for (let i = indexInicio; i < indexFin; i++) {
              this.horarioMap.set(horario.dia + "-" + this.horas[i], horario);
            }
          }
        });
        console.log(this.horarioMap);
      }
    
    getDataHorarios() {
        this.sedesService.getHorarios().subscribe(data => {
            console.log(data);
            this.horariosBase = data;
            this.horarios = data;
            this.getHorario();
        });
    }

    onClaseSelected(claseId: number){
        console.log('claseId', claseId);
        this.horarios = [];
        this.horas = [];
        this.horasNext = [];
        this.horarioMap = new Map<string, HorarioDTO>();
        if(claseId == 999){
          this.horarios = this.horariosBase;
        }else{
          this.horarios = this.horariosBase.filter(horario => horario.horario.id == claseId);
        }
        this.getHorario();

    }

}