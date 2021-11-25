import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLibroComponent } from './components/add-libro/add-libro.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibrosListaComponent } from './components/libros-lista/libros-lista.component';

const routes: Routes = [
  {path:"", component: LibrosListaComponent},
  {path:"libros", component: LibrosListaComponent},
  {path:"add", component: AddLibroComponent},
  {path:"libros/:id", component: LibroDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
