import { HttpClient } from "@angular/common/http";
import { ProductDto } from "../dto/product.dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuspiciantesCategory } from "../dto/category-auspiciantes.dto";
import { AuspiciantesDTO } from "../dto/auspiciantes.dto";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
  })
export class AuspiciantesService {
  constructor(private http: HttpClient) {}

    getAuspiciantes(): Observable<AuspiciantesDTO[]> {
        return this.http.get<AuspiciantesDTO[]>("https://fakestoreapi.com/products");
    }

    getAuspiciantesLocal(): Observable<AuspiciantesDTO[]> {
        return this.http.get<AuspiciantesDTO[]>(`assets/data/auspiciantes.json`);
    }

    getCategoryAuspiciantesLocal(): Observable<AuspiciantesCategory[]> {
        return this.http.get<AuspiciantesCategory[]>(`assets/data/category-auspiciantes.json`);
    }

    getAuspiciantesByCategory(category: number): Observable<AuspiciantesDTO[]> {
        const auspiciantes = this.http.get<AuspiciantesDTO[]>(`assets/data/auspiciantes.json`);
        return new Observable<AuspiciantesDTO[]>(observer => {
            auspiciantes.subscribe((data: AuspiciantesDTO[]) => {
                const auspiciantesByCategory = data.filter((auspiciante) => auspiciante.categoryId === category);
                if (auspiciantesByCategory) {
                    observer.next(auspiciantesByCategory);
                } else {
                    observer.error("Auspiciantes not found");
                }
            });
        });
    }

}