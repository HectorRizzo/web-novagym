import { NgModule } from "@angular/core";
import { CardProductComponent } from "../../shared/card-product/card-product.component";
import { TiendaComponent } from "./tienda/tienda.component";
import { CommonModule } from "@angular/common";
import { ShopRoutingModule } from "./shop-routing.module";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.services";
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TabsModule } from "ngx-bootstrap/tabs";
import { SedesService } from "../../services/sedes.service";
import { GoogleMapsModule } from "@angular/google-maps";
import { PlacesService } from "../../services/places.services";
import { InfoProductoComponent } from "./info-producto/info-producto.component";
import { CartService } from "../../services/cart.services";
import { AuspiciantesService } from "../../services/auspiciantes.services";
import { UsuariosService } from "../../services/usuarios.services";

@NgModule(
    { 
        declarations: [
        CardProductComponent,
        TiendaComponent,
        InfoProductoComponent,
    ],
    exports: [], 
    imports: [CommonModule,
        ShopRoutingModule,
        FormsModule, 
        HttpClientModule,
        RouterModule,
        GoogleMapsModule,
        TabsModule.forRoot()], 
        providers: [
        ProductService, // Provisión del servicio
        CartService,
        SedesService,
        AuspiciantesService,
        UsuariosService
        ] 
})

export class ShopModule {}

