export class SedesDTO{
    id: number;
    nombre: string;
    imagen: string;
    ciudad: string;
    ubicacion: string;
    horario_inicio: string;
    horario_fin: string;
    telefono: string;
    celular: string;
    latitud: string;
    longitud: string;

    constructor(id: number, nombre: string, imagen: string, ciudad: string, ubicacion: string, horario_inicio: string, 
        horario_fin: string, telefono: string, celular: string, latitud: string, longitud: string){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.ciudad = ciudad;
        this.ubicacion = ubicacion;
        this.horario_inicio = horario_inicio;
        this.horario_fin = horario_fin;
        this.telefono = telefono;
        this.celular = celular;
        this.latitud = latitud;
        this.longitud = longitud;
    }
    
}