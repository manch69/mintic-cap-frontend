import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroListarComponent } from './components/libro-listar/libro-listar.component';
import { AddLibroComponent } from './components/add-libro/add-libro.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LibroListarComponent,
    AddLibroComponent,
    LibroDetalleComponent
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
