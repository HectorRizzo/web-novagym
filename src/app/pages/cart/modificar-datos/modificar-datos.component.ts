import { AfterViewInit, Component, OnInit } from "@angular/core";
import { UsuariosService } from "../../../services/usuarios.services";
import { DatosDTO } from "../../../dto/datos.dto";
import { ToastService } from "../../../services/toast.services";

@Component({
    selector: "app-modificar-datos",
    templateUrl: "./modificar-datos.component.html",
    styleUrls: ["./modificar-datos.component.scss"],
})

export class ModificarDatosComponent implements OnInit, AfterViewInit {
    usuario: any = {}
    editDatos: boolean = false;
    continuar: boolean = false;
    constructor(
        private usuariosService: UsuariosService,
        private toastService: ToastService
    ) { }

    ngAfterViewInit() {
        this.getDatosUsuario();
    }

    ngOnInit() {
        console.log('ModificarDatosComponent initialized');
    }

    getDatosUsuario() {
        // Obtener datos del usuario
        console.log('Obtener datos del usuario');
        this.usuariosService.getDatosUsuario().subscribe((data) => {
            this.usuario = data;
        });
    }


    actualizarDatosUsuario() {
        // Actualizar datos del usuario
        console.log('Actualizar datos del usuario');
        if(this.usuario) {
            console.log('Datos del usuario: ', this.usuario);
            this.usuariosService.setDatosUsuario(this.usuario);
        }
    }

    modificarDatos() {
        this.editDatos = true;
        console.log(this.usuario);
        this.actualizarDatosUsuario();
        this.mostrarToast();
    }

    continuarPago(){
        this.continuar = true;
    }

    mostrarToast() {
        this.toastService.showToast('Datos actualizados', 'success');
    }

}