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
        // this.descargarArchivo();
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