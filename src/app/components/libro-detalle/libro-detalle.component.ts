import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit {
  data: any;
  constructor(private libroService: LibroService, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.libroService.get(this.route.snapshot.params.id)
      .subscribe(
        data => {
          this.data=data;
        },
        error => {
          console.log(error);
        });
  }

}
