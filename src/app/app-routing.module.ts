import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SedesComponent } from './pages/sedes/sedes.component';
import { InfoSedesComponent } from './pages/sedes/info-sede/info-sedes.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { NgModule } from '@angular/core';
import { InfoClasesComponent } from './pages/clases/info-clases/info-clases.component';
import { MembresiasComponent } from './pages/membresias/membresias.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { AuspiciantesComponent } from './pages/auspiciantes/auspiciantes.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule) },
  //tienda
  { path: "shop", loadChildren: () => import("./pages/shop/shop.module").then((m) => m.ShopModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
