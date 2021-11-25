import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libros-lista',
  templateUrl: './libros-lista.component.html',
  styleUrls: ['./libros-lista.component.css']
})

export class LibrosListaComponent implements OnInit {

  libros?: Libro[];
  nombre = '';

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.retrieveLibros();
  }

  retrieveLibros(): void {
    this.libroService.getAll()
      .subscribe(
        data => {
          this.libros = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveLibros();
  }
  verDetalle(id: any){
    window.location.href='/libros/'+id;
  }


}

