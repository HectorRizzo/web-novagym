import { Component, Input, OnInit } from "@angular/core";
import { ProductDto } from "../../../dto/product.dto";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../services/product.services";
import { CartService } from "../../../services/cart.services";
import { AuspiciantesService } from "../../../services/auspiciantes.services";
import { ToastService } from "../../../services/toast.services";

@Component({
    selector: "app-info-producto",
    templateUrl: "./info-producto.component.html",
    styleUrls: ["./info-producto.component.scss"]
})

export class InfoProductoComponent implements OnInit{
    product: ProductDto | undefined;
    aditionalInfo: any | undefined;
    productosRelacionados: ProductDto[] | undefined;
    cantidad: number = 1;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private auspiciantesService: AuspiciantesService,
        private toast: ToastService
    ) {}

    ngOnInit() {
        this.auspiciantesService.getCategoryAuspiciantesLocal().subscribe((data) => {
            console.log("Categorias de auspiciantes: ", data);
        });
        console.log("InfoProductoComponent initialized");
        this.route.paramMap.subscribe(params => {
            const productId = params.get("id");
            if (productId) {
                this.loadProduct(productId);
            }
            this.obtenerProductosRelacionados();
        });
    }

    loadProduct(id: string) {
        console.log("Cargando producto con id: ", id);
        this.productService.getProductByIdFileLocal(id).subscribe(product => {
            this.product = product;
            this.aditionalInfo= product.aditionalInfo;
            console.log("Producto: ", this.product);
            console.log("Información adicional: ", this.aditionalInfo);
        });
    }

    obtenerProductosRelacionados(){
        //obtener 3 numeros aleatorios entre 1 y 10
        let numerosAleatorios = this.obtenerNumerosAleatorios(1, 8, 3);
        console.log("Numeros aleatorios: ", numerosAleatorios);
        this.productosRelacionados = [];
        numerosAleatorios.forEach(numero => {
            this.productService.getProductByIdFileLocal(numero.toString()).subscribe(product => {
                this.productosRelacionados?.push(product);
            });
        });
    }

    obtenerNumerosAleatorios(min: number, max: number, cantidad: number): number[]{
        //que no sea el id del producto actual y que no se repitan
        let numeros: number[] = [];
        while(numeros.length < cantidad){
            let numero = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log("Numero: ", numero);
            if(numero !== Number(this.product?.id) && !numeros.includes(numero)){
                numeros.push(numero);
            }
        }
        return numeros;
    }

    addCantidad( cantidad: number){
        const btnMinus = document.getElementById("minus");
        if(this.cantidad + cantidad <= 1){
            btnMinus?.setAttribute("disabled", "true");
        }
        else{
            btnMinus?.removeAttribute("disabled");
        }
        console.log("Cantidad: ", cantidad);
        this.cantidad += cantidad;
    }

    addToCart() {
        if (this.product) {
            this.product.cantidad = this.cantidad;
          this.cartService.addToCart({ ...this.product});
            this.muestraToast();
        }
    }

    muestraToast() {
        this.toast.showToast('Producto añadido al carrito', 'success');
    }



    descargarArchivo(){
        let data= "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"
             var binaryData = [];
        binaryData.push(data);
        var downloadURL = window.URL.createObjectURL(new Blob([this.s2ab(atob(data))], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }))
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Error-Carga.xls";
        link.click();
    }

    s2ab(s: string) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    }

}