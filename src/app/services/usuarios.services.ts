import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DatosDTO } from "../dto/datos.dto";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})

export class UsuariosService{

    private datos: any = {};
    private datosSubject = new BehaviorSubject<DatosDTO>(this.datos);


    constructor(private http: HttpClient) {
        console.log('UsuariosService');
        this.loadDatosUsuario();
    }

    loadDatosUsuario() {
        const savedDatos = localStorage.getItem('datosNova');
        if (savedDatos) {
            this.datos = JSON.parse(savedDatos);
            this.datosSubject.next(this.datos);
        }
    }

    saveDatosUsuario() {
        localStorage.setItem('datosNova', JSON.stringify(this.datos));
    }

    getDatosUsuario() {
        console.log('getDatosUsuario');
        return this.datosSubject.asObservable();
    }

    setDatosUsuario(datos: DatosDTO) {
        this.datos = datos;
        this.datosSubject.next(this.datos);
        this.saveDatosUsuario();
    }

    getMembresias(): Observable<any> {
        return this.http.get(`http://localhost:3000/membresias`);
    }

}