export class AuspiciantesDTO{
    id: string;
    name: string;
    logo: string;
    description: string;
    categoryId: number;

    constructor(id: string, name: string, logo: string, description: string, category: number) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.description = description;
        this.categoryId = category;
    }

}
