import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NoticiasComponent } from './pages/noticias/noticias.component';
export const routes: Routes = [
  { path: "", loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule) },
  {path:"noticias2", component: NoticiasComponent},
  //tienda
  { path: "shop", loadChildren: () => import("./pages/shop/shop.module").then((m) => m.ShopModule) },
  {path: "**", redirectTo: "/noticias2", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]

})
export class AppRoutingModule { }
