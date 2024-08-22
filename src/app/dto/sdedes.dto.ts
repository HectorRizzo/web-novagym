export class SedesDTO{
    id: string;
    nombre: string;
    image: string;
    ciudad: string;

    constructor(id: string, nombre: string, image: string, ciudad: string) {
        this.id = id;
        this.nombre = nombre;
        this.image = image;
        this.ciudad = ciudad;
    }
    
}