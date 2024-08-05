import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-clases",
    templateUrl: "./clases.component.html",
    styleUrls: ["./clases.component.scss"]
    })
export class ClasesComponent implements OnInit {
    constructor(private router:Router,
        private viewportScroller: ViewportScroller
    ) { }
    ngOnInit() { }

    navigateToInfoClases() {
        console.log("Navigating to info clases");
        this.router.navigate(['/clases/info-clases']).then(() => {
            this.viewportScroller.scrollToPosition([0, 0]);
          });
    }
}