import { TarjetaDTO } from "./tarjeta.dto";

export class DatosDTO{
    id: string;
    numIdentificacion: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
    tipoEntrega: string;
    tarjetas?: TarjetaDTO[];

    constructor(id: string, numIdentificacion: string , nombres: string, apellidos: string, direccion: string, telefono: string, email: string, tipoEntrega: string, tarjetas: TarjetaDTO[]){
        this.id = id;
        this.numIdentificacion = numIdentificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.tipoEntrega = tipoEntrega;
        this.tarjetas = tarjetas;
    }

}