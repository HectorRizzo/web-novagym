import { Component, OnDestroy, OnInit } from "@angular/core";

interface Location {
    lat: number;
    lng: number;
    name: string;
    description: string;
  }

@Component({
    selector: "app-info-clases",
    templateUrl: "./info-clases.component.html",
    styleUrls: ["./info-clases.component.scss"]
    })
export class InfoClasesComponent implements OnInit, OnDestroy {

    constructor() { }
    ngOnInit() { }

    ngOnDestroy(): void { }

    
}