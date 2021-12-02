import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro-service.service';

@Component({
  selector: 'app-libro-listar',
  templateUrl: './libro-listar.component.html',
  styleUrls: ['./libro-listar.component.css']
})

export class LibroListarComponent implements OnInit {

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
        window.location.href='/libro/'+id;
        //this.router.navigate(['/tutorials']);
        //import { ActivatedRoute, Router } from '@angular/router';
    }
    
    
    }
