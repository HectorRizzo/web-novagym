import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlanesDto } from "../dto/planes.dto";
import { ResponsePagination } from "../dto/responsePagination.dto";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
  })
export class MembresiasService{
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getMembresias(): Observable<PlanesDto[]> {
        return this.http.get<PlanesDto[]>(`${this.baseUrl}/api/membresias`);
    }
}