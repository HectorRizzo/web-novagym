import { Observable } from "rxjs";
import { SedesDTO } from "../dto/sedes.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { clasesDTO } from "../dto/clases.dto";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
  })
export class SedesService{
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getSedesLocal(): Observable<SedesDTO[]> {
        return this.http.get<SedesDTO[]>(`assets/data/sedes.json`);
    }

    getSedes(): Observable<SedesDTO[]> {
        return this.http.get<SedesDTO[]>(`${this.baseUrl}/gimnasio/getGimnasios`);
    }

    getSedeById(idSede: number): Observable<SedesDTO> {
        return this.http.get<SedesDTO>(`${this.baseUrl}/gimnasio/getGimnasios/${idSede}`);
    }

    getHorariosSede(idSede: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/gimnasio/getHorariosSede/${idSede}`);
    }

    getHorarios(): Observable<any> {
        return this.http.get(`${this.baseUrl}/calendario/horarios/`);
    }

    //Clases

    getClases(): Observable<clasesDTO[]> {
        return this.http.get<clasesDTO[]>(`${this.baseUrl}//calendario/verClases/`);
    }

    getClaseById(idClase: number): Observable<clasesDTO> {
        return this.http.get<clasesDTO>(`${this.baseUrl}/calendario/verClases/${idClase}`);
    }

}