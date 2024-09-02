export class AuspiciantesDTO{
    id: string;
    nombre: string;
    imagen: string;
    beneficios: string;
    categoryId: number;

    constructor(id: string, name: string, logo: string, description: string, category: number) {
        this.id = id;
        this.nombre = name;
        this.imagen = logo;
        this.beneficios = description;
        this.categoryId = category;
    }

}
