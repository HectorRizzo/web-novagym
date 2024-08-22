import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";

import { HomeComponent } from "./home/home.component";
import { SedesComponent } from "./sedes/sedes.component";
import { InfoSedesComponent } from "./sedes/info-sede/info-sedes.component";
import { ContactanosFooterComponent } from "../shared/contactanos-footer/contactanos-footer.component";
import { ClasesComponent } from "./clases/clases.component";
import { NuestroTeamComponent } from "../shared/nuestro-team/nuestro-team.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { MapaComponent } from "../shared/mapa/mapa.component";
import { HorarioComponent } from "../shared/horario/horario.component";
import { InfoClasesComponent } from "./clases/info-clases/info-clases.component";
import { MembresiasComponent } from "./membresias/membresias.component";
import { NoticiasComponent } from "./noticias/noticias.component";
import { RegistroComponent } from "./registro/registro.component";
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
import { ShopModule } from "./shop/shop.module";
import { AuspiciantesComponent } from "./auspiciantes/auspiciantes.component";
import { AuspiciantesService } from "../services/auspiciantes.services";
import { CartComponent } from "./cart/cart.component";
import { CartService } from "../services/cart.services";
import { OpcionesEntregaComponent } from "./cart/opciones-entrega/opciones-entrega.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GoogleMapsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ShopModule
    ],
  declarations: [
    HorarioComponent,
    HomeComponent,
    SedesComponent,
    InfoSedesComponent,
    ContactanosFooterComponent,
    NuestroTeamComponent,
    ClasesComponent,
    InfoClasesComponent,
    MapaComponent,
    MembresiasComponent,
    NoticiasComponent,
    RegistroComponent,
    InicioSesionComponent,
    AuspiciantesComponent,
    CartComponent,
    OpcionesEntregaComponent
      ],
  exports: [
    HomeComponent
    ],
    providers: [
      AuspiciantesService,
      CartService
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}
