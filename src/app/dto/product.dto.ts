export class ProductDto {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
    created_at: Date;
    updated_at: Date;
    aditionalInfo: Object;

    constructor(id: string, name: string, price: number, description: string, image: string, category: string, stock: number, created_at: Date, updated_at: Date, aditonalInfo: Object) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
        this.stock = stock;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.aditionalInfo = aditonalInfo;
    }
}