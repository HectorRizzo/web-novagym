import { Component, Input, OnInit } from "@angular/core";
import { ProductDto } from "../../dto/product.dto";
import { Router } from "@angular/router";

@Component({
    selector: "app-card-product",
    templateUrl: "./card-product.component.html",
    styleUrls: ["./card-product.component.scss"]
    })
export class CardProductComponent implements OnInit {
    @Input() product: ProductDto | undefined;
    constructor(private router: Router) {}

    ngOnInit() {}

    viewProduct() {
        if (this.product) {
            
            this.router.navigate(["/shop/product", this.product.id]);
        }
    }
}