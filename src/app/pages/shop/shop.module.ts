import { NgModule } from "@angular/core";
import { CardProductComponent } from "../../shared/card-product/card-product.component";
import { TiendaComponent } from "./tienda/tienda.component";
import { CommonModule } from "@angular/common";
import { ShopRoutingModule } from "./shop-routing.module";
import { FormsModule } from "@angular/forms";
import { InfoProductoComponent } from "./info-producto/info-producto.component";
import { ProductService } from "../../services/product.services";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TabsModule } from "ngx-bootstrap/tabs";

@NgModule({
    declarations: [CardProductComponent,
        TiendaComponent,
        InfoProductoComponent
    ],
    imports: [    CommonModule,
        ShopRoutingModule,
        FormsModule,
        HttpClientModule, // Asegúrate de importar HttpClientModule
        RouterModule,
        TabsModule.forRoot(),

    ],
    exports: [],
    providers: [
        ProductService // Provisión del servicio
      ],
})

export class ShopModule {}

