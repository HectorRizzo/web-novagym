import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SedesComponent } from './sedes/sedes.component';
import { InfoSedesComponent } from './sedes/info-sede/info-sedes.component';
import { ClasesComponent } from './clases/clases.component';
import { InfoClasesComponent } from './clases/info-clases/info-clases.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { RegistroComponent } from './registro/registro.component';
import { AuspiciantesComponent } from './auspiciantes/auspiciantes.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "sedes", component: SedesComponent},
    {path: "sedes/info-sedes", component: InfoSedesComponent},
    { path: "clases", component: ClasesComponent },
    {path: "clases/info-clases", component: InfoClasesComponent},
    {path: "membresias", component: MembresiasComponent},
    { path: "noticias", component: NoticiasComponent},
    {path: "registro", component: RegistroComponent},
    {path: "inicio-sesion", component: InicioSesionComponent},
    { path: "auspiciantes", component: AuspiciantesComponent},
    
  //cart
  {path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }