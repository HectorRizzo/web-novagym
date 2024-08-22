import { Observable } from "rxjs";
import { SedesDTO } from "../dto/sdedes.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
  })
export class SedesService{
    constructor(private http: HttpClient) {}

    getSedesLocal(): Observable<SedesDTO[]> {
        return this.http.get<SedesDTO[]>(`assets/data/sedes.json`);
    }
}