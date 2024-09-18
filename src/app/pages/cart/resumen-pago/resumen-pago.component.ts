import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.services";
import { ProductDto } from "../../../dto/product.dto";
import { UsuariosService } from "../../../services/usuarios.services";
import { DatosDTO } from "../../../dto/datos.dto";
import { ToastService } from "../../../services/toast.services";
import { Router } from '@angular/router';
@Component({
    selector: "app-resumen-pago",
    templateUrl: "./resumen-pago.component.html",
    styleUrls: ["./resumen-pago.component.scss"]
    })

    export class ResumenPagoComponent implements OnInit {
        productos: ProductDto[] = [];
        subtotal = 0;
        impuestos = 0;
        total = 0;
        delivery = 3;
        usuario: DatosDTO | undefined;
        constructor(private cartService: CartService,
            private toast: ToastService,
            private route: Router,
            private usuariosService: UsuariosService
         ) {}

        ngOnInit() {
            this.getDatosUsuario();
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

        getTotal() {
            // Calcular el total del carrito
            this.subtotal = this.productos.reduce((acc, product) => acc + (product.price) *(product.cantidad?? 0), 0);
            this.impuestos = this.subtotal * 0.16;
            this.total = this.subtotal + this.impuestos + this.delivery;
        }

        continuarPago() {
            // Continuar con el pago
            console.log('Continuar con el pago');
            //enviar al top de la pagina
            window.scrollTo(0, 0);
            this.muestraToast();
            this.cartService.clearCart();
            window.location.reload();
        }


        muestraToast() {
            this.toast.showToast('Pago realizado con éxito', 'success');
        }

        getDatosUsuario() {
            // Obtener datos del usuario
            console.log('Obtener datos del usuario');
            this.usuariosService.getDatosUsuario().subscribe((data) => {
                this.usuario = data;
            });
        }


    }