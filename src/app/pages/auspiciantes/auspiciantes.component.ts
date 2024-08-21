import { Component, OnInit } from "@angular/core";
import { AuspiciantesService } from "../../services/auspiciantes.services";
import { AuspiciantesCategory } from "../../dto/category-auspiciantes.dto";
import { AuspiciantesDTO } from "../../dto/auspiciantes.dto";

@Component({
    selector: "app-auspiciantes",
    templateUrl: "./auspiciantes.component.html",
    styleUrls: ["./auspiciantes.component.scss"],
})
export class AuspiciantesComponent  implements OnInit {

    categorias: AuspiciantesCategory[] = [];
    auspiciantes: AuspiciantesDTO[] = [];

    constructor(private auspiciantesService: AuspiciantesService) { }

    ngOnInit() {
        this.getCategorias();
        this.getAuspiciantesByCategory(0);
    }

    getCategorias(){
        this.auspiciantesService.getCategoryAuspiciantesLocal().subscribe((data: AuspiciantesCategory[]) => {
            this.categorias = data;
            this.categorias.unshift(new AuspiciantesCategory(0, "Todas"));
        });
    }

    getAuspiciantesByCategory(category: number){
        if(category === 0){
            this.auspiciantesService.getAuspiciantesLocal().subscribe((data: AuspiciantesDTO[]) => {
                this.auspiciantes = data;
            });
        }else{
            this.auspiciantesService.getAuspiciantesByCategory(category).subscribe((data: AuspiciantesDTO[]) => {
                this.auspiciantes = data;
            });
        }
    }

    onCategoryChange(event: any){
        console.log(event);
        this.getAuspiciantesByCategory(event.id);
    }

}