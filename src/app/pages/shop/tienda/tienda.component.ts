import { Component, OnInit } from "@angular/core";
import { ProductDto } from "../../../dto/product.dto";
import { ProductService } from "../../../services/product.services";

const productos: ProductDto[] = [
    new ProductDto(
        "1",
        "Proteína en polvo",
        105,
        "Proteína en polvo con 30 gramos de proteína por ración y 0 azúcares añadidos.",
        "assets/img/product-1.png",
        "Suplementos",
        10,
        new Date(),
        new Date(),
        { peso: "1.6", sabor: "Chocolate" }
    ),
    new ProductDto(
        "2",
        "Camiseta Novagym",
        25,
        "Camiseta de algodón 100% con el logo de Novagym en el pecho.",
        "assets/img/product-2.png",
        "Ropa",
        5,
        new Date(),
        new Date(),
        { color: "blanca", talla: "L" }
    ),
    new ProductDto(
        "3",
        "Mochila de deporte",
        15,
        "Mochila de deporte con compartimento para zapatillas y bolsillo para botella de agua.",
        "assets/img/product-3.png",
        "Accesorios",
        3,
        new Date(),
        new Date(),
        { color:"gris", tamaño: "M" }
    ),
    new ProductDto(
        "4",
        "Barra de proteínas",
        2,
        "Barra de proteínas con 20 gramos de proteína y 0 azúcares añadidos.",
        "assets/img/product-4.png",
        "Snacks",
        20,
        new Date(),
        new Date(),
        { sabor: "chocolate" }
    ),
    new ProductDto(
        "5",
        "Cuerda de saltar",
        5,
        "Cuerda de saltar de PVC con asas de espuma.",
        "assets/img/product-5.png",
        "Accesorios",
        10,
        new Date(),
        new Date(),
        { color: "negra" }
    ),
    new ProductDto(
        "6",
        "Zapatillas de running",
        80,
        "Zapatillas de running con tecnología Air Max para una mayor amortiguación.",
        "assets/img/product-6.png",
        "Calzado",
        2,
        new Date(),
        new Date(),
        { color: "gris", talla: "42" }
    ),
    new ProductDto(
        "7",
        "Zapatillas de crossfit",
        100,
        "Zapatillas de crossfit con suela Vibram para una mayor tracción.",
        "assets/img/product-8.png",
        "Calzado",
        1,
        new Date(),
        new Date(),
        { color: "negro", talla: "41" }
    ),
    //Producto Buzo
    new ProductDto(
        //completar
        "8",
        "Buzo",
        40,
        "Buzo para entrenar",
        "assets/img/product-9.png",
        "Ropa",
        3,
        new Date(),
        new Date(),
        {color:"amarillo", talla:"L"}
    )
];

@Component({
    selector: "app-tienda",
    templateUrl: "./tienda.component.html",
    styleUrls: ["./tienda.component.scss"]
    })

export class TiendaComponent implements OnInit {
    products:ProductDto[] | undefined;
    sliderValue: number = 50; // Propiedad para el valor del slider

    constructor(private productService: ProductService) {}
    ngOnInit() {
        console.log("init")
        this.getProducts();
    }
      // Método para manejar el cambio del slider
  onSliderChange(event: any) {
    this.sliderValue = event.target.value;
  }

  getProducts(){
    const data = this.productService.getProductsFileLocal().subscribe(
        (products) => {
            console.log("Productos : ", products);
            this.products = products;
        },
        (error) => {
            console.log("Error al obtener productos: ", error);
        }

    )
  }

}