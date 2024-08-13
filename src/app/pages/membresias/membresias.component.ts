import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-membresias",
    templateUrl: "membresias.component.html",
    styleUrls: ["membresias.component.scss"]
    })

export class MembresiasComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        
    }

    toggleActive(event: Event) {
        const cardFooter = event.currentTarget as HTMLElement;
        cardFooter.classList.toggle('card-footer-active');
      }

    selectPlan(event: Event) {
        const btn = event.target as HTMLElement;

        console.log(btn);

        btn.classList.toggle('btn-planes-active');
    }
}