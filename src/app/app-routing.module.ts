import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLibroComponent } from './components/add-libro/add-libro.component';
import { LibroListarComponent } from './components/libro-listar/libro-listar.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';

const routes: Routes = [
  { path: '', component: LibroListarComponent},
  { path: 'libro', component: LibroListarComponent },
  { path: 'libro/:id', component: LibroDetalleComponent },
  { path: 'addLibro', component: AddLibroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
