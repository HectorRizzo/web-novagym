import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SedesComponent } from './pages/sedes/sedes.component';
import { ClasesComponent } from './pages/clases/clases.component';


export const routes: Routes = [
    { path: '', component: AppComponent }, // Ruta principal
    { path: 'home', component: HomeComponent },
    {path: 'sedes', component: SedesComponent},
    {path: 'clases', component: ClasesComponent},
  ];