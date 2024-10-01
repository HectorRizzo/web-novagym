import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuariosService } from "../../services/usuarios.services";
import { DatosDTO } from "../../dto/datos.dto";
import { ToastService } from "../../services/toast.services";

@Component({
    selector: "app-registro",
    templateUrl: "./registro.component.html",
    styleUrls: ["./registro.component.scss"]
    })
export class RegistroComponent implements OnInit {
    nombre: string;
    apellido: string;
    identificacion: string;
    email: string;
    contrasena: string;
    fechaNacimiento: string;
    sexo: string;
    telefono: string;
    errores: any = {};
    detallesErrores: any = {};

    constructor(private router: Router,
        private usuariosService: UsuariosService,
        private toastService: ToastService
    ) {
        this.nombre = '';
    this.apellido = '';
    this.identificacion = '';
    this.email = '';
    this.contrasena = '';
    this.fechaNacimiento = '';
    this.sexo = '';
    this.telefono = '';
    }

    ngOnInit() {}

    clickRegistro(){
        let datosReg = {
            password: this.contrasena,
            password2: this.contrasena,
            email : this.email,
            created_from: "WEB",
            detalles: {
                codigo: 1,
                cedula: this.identificacion,
                nombres: this.nombre,
                apellidos: this.apellido,
                telefono: this.telefono,
                sexo: this.sexo,
                tipo: "C",
                fecha_nacimiento: this.fechaNacimiento
            }
        }
        //registrar usuario
        this.usuariosService.registrarUsuario(datosReg).subscribe(
            (response: any) => {
                console.log(response);
                //navegar a home
                this.router.navigate(["/inicio-sesion"]);
                this.toastService.showToast("Usuario registrado correctamente");
            },
            (error: any) => {
                console.log(error);
                this.errores = error.error;
                this.detallesErrores = this.errores.detalles;
                console.log(this.detallesErrores);
                this.toastService.showToast("Error al registrar usuario, llene todos los campos correctamente");

            }
        );

    }
}