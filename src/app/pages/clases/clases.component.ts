import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SedesService } from "../../services/sedes.service";
import { clasesDTO } from "../../dto/clases.dto";

@Component({
    selector: "app-clases",
    templateUrl: "./clases.component.html",
    styleUrls: ["./clases.component.scss"]
    })
export class ClasesComponent implements OnInit {
    clases: clasesDTO[] = [];
    constructor(private router:Router,
        private viewportScroller: ViewportScroller,
        private sedesService: SedesService
    ) { }
    ngOnInit() {
        this.obtenerClases();
     }

    navigateToInfoClases(id:number) {
        console.log("Navigating to info clases");
        this.router.navigate(['/clases/info-clases'], { queryParams: { clase: id } })
        .then(() => {
            this.viewportScroller.scrollToPosition([0, 0]);
          });
    }

    obtenerClases(){
        this.sedesService.getClases().subscribe((data: any) => {
            console.log(data);
            this.clases = data;
        });
    }
}