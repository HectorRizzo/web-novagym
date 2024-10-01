import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuariosService } from "../../services/usuarios.services";
import { DatosDTO } from "../../dto/datos.dto";
import { ToastService } from "../../services/toast.services";

@Component({
    selector: "app-inicio-sesion",
    templateUrl: "./inicio-sesion.component.html",
    styleUrls: ["./inicio-sesion.component.scss"]
    })

export class InicioSesionComponent implements OnInit{
    email: string;
    contrasena: string;
    iniciarSesion = true;
    constructor(
        private usuariosService: UsuariosService,
        private router: Router,
        private toastService: ToastService
    ) {
        this.email = '';
        this.contrasena = '';
        }
    ngOnInit(): void {
    }

    clickIniciarSesion(){
        this.usuariosService.iniciarSession({
            username: this.email,
            password: this.contrasena
        }).subscribe(
            (response: any) => {
                console.log(response);
                let user = response.user;
                let datos: DatosDTO = {
                    id: user.id,
                    numIdentificacion: user.detalles.cedula,
                    nombres: user.detalles.nombres,
                    apellidos: user.detalles.apellidos,
                    direccion: user.detalles.direccion,
                    telefono: user.detalles.telefono,
                    email: user.email,
                    tipoEntrega: "Domicilio",
                    tarjetas: []
                };
                this.usuariosService.setDatosUsuario(datos);
                setTimeout(() => {
                    window.location.reload();
                }, 300);
                this.router.navigate(["/home"]);
            },
            (error) => {
                console.log(error);
                this.toastService.showToast('Error al iniciar sesión, verifique su usuario y contraseña', 'error');
            }
        );
    }

    clickRegistro(){
        //navegar a registro
        this.router.navigate(["/registro"]);
    }
    


}