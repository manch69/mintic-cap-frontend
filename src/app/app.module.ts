import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddLibroComponent } from './components/add-libro/add-libro.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibrosListaComponent } from './components/libros-lista/libros-lista.component';


import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    AddLibroComponent,
    LibroDetalleComponent,
    LibrosListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
