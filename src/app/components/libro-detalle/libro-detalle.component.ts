import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro-service.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit {
    libroActivo: Libro ={
        nombre: '',
        descripcion: '',
    }
    message: string = '';
    
    constructor(private libroService: LibroService,
        private ruta: ActivatedRoute,
        private enrutador: Router) { }

    ngOnInit(): void {
        this.message ='';
        this.getLibro(this.ruta.snapshot.params.id);
    }

    getLibro(id: any){
        this.libroService.get(id)
        .subscribe(
        data => {
            this.libroActivo = data;
            console.log(data);
        },
        error => {
            console.log(error);
        });
    }
    
    
    updateLibro(): void {
        this.libroService.update(this.libroActivo._id, this.libroActivo)
        .subscribe(
            response => {
            console.log(response);
            this.message = response;
            this.enrutador.navigate(["/libro"]);
            },
            error => {
            console.log(error);
            });
    }

    deleteLibro(): void {
        this.libroService.delete(this.libroActivo._id)
        .subscribe(
            response => {
            console.log(response);
            this.enrutador.navigate(['/libro']);
            },
            error => {
            console.log(error);
            });
    }
}
