import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro-service.service';

@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css']
})

export class AddLibroComponent implements OnInit {
    //Atributos
    libro: Libro = {
        nombre: '',
        descripcion: ''
    }
    submitted = false;
    
    constructor(private libroService: LibroService) { }
    
    ngOnInit(): void {
    
    }
    
    saveLibro(): void {
        const data = {
          nombre: this.libro.nombre,
          descripcion: this.libro.descripcion
        };
    
        this.libroService.create(data)
        .subscribe(
            response => {
            console.log(response);
            this.submitted = true;
            },
            error => {
            console.log(error);
            });
    }
    
    newLibro(): void {
        this.submitted = false;
        this.libro = {
          nombre: '',
          descripcion: ''
        };
    }
    
    }
    
