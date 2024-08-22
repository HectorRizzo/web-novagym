import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.services";
import { ProductDto } from "../../dto/product.dto";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
    providers: [CartService]
})

export class CartComponent implements OnInit {
    showCart: boolean = true;
    showOpcionesEntrega: boolean = false;
    productos: ProductDto[] = [];
    total: number = 0;
    constructor(
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.obtenerProductos();
    }

    obtenerProductos() {
        // Obtener productos del carrito
        this.cartService.getCartItems().subscribe((products) => {
            console.log("Productos del carrito: ", products);
            this.productos = products;
        });
        this.getTotal();
    }

    removeItem(product: ProductDto) {
        this.cartService.removeProduct(product);
        this.updateCart();
    }

    updateCart() {
        // Actualizar carrito
        this.obtenerProductos();
    }

    getTotal() {
        // Calcular el total del carrito
        this.total = this.productos.reduce((acc, product) => acc + (product.price) *(product.cantidad?? 0), 0);
    }

    finalizarCompra() {
        // Finalizar compra
        this.showCart = false;
        this.showOpcionesEntrega = true;
    }
}