import { ProductDto } from "../dto/product.dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
  })
export class ProductService {
  constructor(private http: HttpClient) {
    console.log('ProductService');
  }

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>("https://fakestoreapi.com/products");
  }

  getProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`https://fakestoreapi.com/products/${id}`);
  }

  getProductByIdFileLocal(id: string): Observable<ProductDto> {
    console.log('getProductByIdFileLocal');
    let productos = this.http.get<ProductDto[]>(`assets/data/products.json`);
    return new Observable<ProductDto>(observer => {
      productos.subscribe((data: ProductDto[]) => {
        const product = data.find((product) => product.id === id);
        if (product) {
          observer.next(product);
        } else {
          observer.error("Product not found");
        }
      });
    });
  }

  getProductsFileLocal(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`assets/data/products.json`);
  }
}