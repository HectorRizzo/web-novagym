import { SedesDTO } from "./sedes.dto";

export class clasesDTO{
    id: number;
    nombre: string;
    descripcion: string;
    sede: SedesDTO;

    constructor(id: number, nombre: string, descripcion: string, sede: SedesDTO){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.sede = sede;
    }
}