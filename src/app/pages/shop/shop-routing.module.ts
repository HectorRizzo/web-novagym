import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component'; // Ajusta la ruta según la ubicación de tu componente
import { InfoProductoComponent } from './info-producto/info-producto.component';

const routes: Routes = [
  { path: '', component: TiendaComponent }, // Ruta para TiendaComponent
  //Ruta para cada producto
  { path: 'product/:id', component: InfoProductoComponent } // Ajusta la ruta según la ubicación de tu componente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }