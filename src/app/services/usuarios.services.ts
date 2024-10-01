import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DatosDTO } from "../dto/datos.dto";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})

export class UsuariosService{
    baseUrl = environment.baseUrl;
    private datos: any = {};
    private datosSubject = new BehaviorSubject<DatosDTO>(this.datos);
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.estaLogueado());


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
        this.isLoggedInSubject.next(true);
    }

    //Validar si el usuario esta logueado
    estaLogueado(): boolean {
        let datos = localStorage.getItem('datosNova');
        return datos ? true : false;
    }

  
    //Registro
    registrarUsuario(datos: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/registrarse/`, datos);
    }

    iniciarSession(datos: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/login/`, datos);
    }

    logout() {
        localStorage.removeItem('datosNova');
        this.datos = {};
        this.datosSubject.next(this.datos);
        this.isLoggedInSubject.next(false);
    }

    getIsLoggedIn() {
        console.log('getIsLoggedIn');
        return this.isLoggedInSubject.asObservable();
    }

    //tarjetas
    getTarjetas(): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/tarjeta/?usuario_id=${this.datos.id}`);
    }


}