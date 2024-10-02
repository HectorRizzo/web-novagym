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
import { AuspiciantesComponent } from "./auspiciantes/auspiciantes.component";
import { CartComponent } from "./cart/cart.component";
import { OpcionesEntregaComponent } from "./cart/opciones-entrega/opciones-entrega.component";
import { HttpClientModule } from "@angular/common/http";
import { AuspiciantesService } from "../services/auspiciantes.services";
import { PageRoutingModule } from "./pages-routing.module";
import { PagoComponent } from "./cart/pago/pago.component";
import { ResumenPagoComponent } from "./cart/resumen-pago/resumen-pago.component";
import { ModificarDatosComponent } from "./cart/modificar-datos/modificar-datos.component";
import { SedesService } from "../services/sedes.service";
import { MembresiasService } from "../services/membresias.service";
import { ResumenMembresiaComponent } from "./membresias/resumen-membresia/resumen-membresia.component";
import { TerminosCondicionesComponent } from "../shared/terminos-condiciones/terminos-condiciones.component";
import { UsuariosService } from "../services/usuarios.services";
import { CartService } from "../services/cart.services";

@NgModule({
  declarations: [
    AuspiciantesComponent,
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
    CartComponent,
    OpcionesEntregaComponent,
    PagoComponent,
    ResumenPagoComponent,
    ModificarDatosComponent,
    ResumenMembresiaComponent,
    TerminosCondicionesComponent,
    PagoComponent,
    ModificarDatosComponent,
    ResumenPagoComponent,
    ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    HttpClientModule, // Asegúrate de que HttpClientModule esté importado aquí
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
    ModalModule.forRoot()
  ],
  providers: [
    AuspiciantesService,
    SedesService,
    MembresiasService,
    UsuariosService,
    CartService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}