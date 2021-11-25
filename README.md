Capacitacion Angular
=============================
### Por: Miguel Noriega

Esta capacitacion se dicto el dia 25 de noviembre del 2021,
bajo el marco del programa Mision Tic 2022, en el alma mater UIS.

La grabacion de dicha capacitacion puede ser encontrada en la seccion de Bienestar estudiantil.

Se realizara un frontend con conexion a el [backend](https://github.com/manch69/mintic-tutor4-cap-nosql) (https://github.com/manch69/mintic-tutor4-cap-nosql)

### NOTA ACLARATORIA:
Durante la capacitacion de las 10 AM, se tuvieron problemas con los CORS, que no fueron resueltos durante el webinar, el error procedio en la linea 8 del archivo [libro.service.ts](src/app/services/libro.service.ts), la cual se cambio desde:
```js
const baseUrl = 'localhost:4000/api/libro'
```
a
```js
const baseUrl = 'http://localhost:4000/api/libro'
```
El problema fue indetectable durante el webinar pero una revison exhaustiva hizo entender que en la base no se indico el tipo de protocolo (http).

----------------------------------
## Pasos para Configurar el Proyecto Frontend Angular
----------------------------------
1. Instalar Angular
    ```
    npm install -g @angular/cli
    ```

2. Crear un nuevo proyecto 
    ```
    ng new NOMBRE_DEL_PROYECTO
    ```
    En este punto se nos preguntaran 2 cosas:
    
    a. Si queremos que angular rutee nuestra APP a lo que contestaremos que si (y)
    ```
    ej: Would you like to add Angular routing? (y/N) y
    ```
    b. Deseamos trabajar con CSS, por lo que daremos Enter 
    ```
    ej: ? Which stylesheet format would you like to use?
    ```
3. ### Como crear componentes:

```
ng g c components/NOMBRE_DEL_COMPONENTE
```
4. ### Como crear Servicios:
```
ng g s services/NOMBRE_DEL_SERVICIO
```
5. Como crear Modelos:
```
ng g class models/NOMBRE_DEL_MODELO --type=model
```
6. Como instalar Bootstrap:
    a. Ejecutar:
    ```
    npm install bootstrap jquery --save
    ```
    b. Se debe buscar las etiquetas "styles", y "scripts" al archivo [angular.json](angular.json) y agregar lo siguiente:
    ```JSON
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.css"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]
    ```

----------------------------------
## Plantillas Proyecto Frontend Angular
----------------------------------
1. Agregar FormsModule y HttpClientModule:
    ```js
    import { FormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
    declarations: [ ... ],
    imports: [
        ...
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
2. Crear Rutas para componentes. [Crear Componente](#como-crear-componentes)

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ENTIDADListComponent } from './components/ENTIDAD-list/ENTIDAD-list.component';
import { AddENTIDADComponent } from './components/add-ENTIDAD/add-ENTIDAD.component';
import { ENTIDADDetailsComponent } from './components/ENTIDAD-details/ENTIDAD-details.component';

const routes: Routes = [
  { path: '', component: ENTIDADListComponent},
  { path: 'ENTIDAD', component: ENTIDADListComponent },
  { path: 'ENTIDAD/:id', component: ENTIDADDetailsComponent },
  { path: 'addENTIDAD', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
3. Componente DataService [Crear Service](#como-crear-servicios),  [libro.service.ts](src/app/services/libro.service.ts) :
```js
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Libro } from '../models/libro.model';

const baseUrl = 'http://localhost:4000/api/libro'

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Libro[]>{
    return this.http.get<Libro[]>(baseUrl)
  } 

  get(id: any): Observable<Libro>{
    return this.http.get(`${baseUrl}/${id}`) // `
  }

  create(data: any): Observable<Libro>{
    return this.http.post(baseUrl, data)
  }

}
```

4. Componente Listar Documentos:
    1. ENTIDAD-list.components.ts
        ```js
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
            //this.router.navigate(['/tutorials']);
            //import { ActivatedRoute, Router } from '@angular/router';
        }


        }
        ```
    2. add-ENTIDAD-list.components.html
        ```html
        <div class="list row">
            <div class="col-md-6">
                <h4>Libros List</h4>
                <ul class="list-group">
                    <li
                    class="list-group-item"
                    *ngFor="let libro of libros; let i = index"
                    (click)="verDetalle(libro._id);"
                    >
                    {{ libro.nombre }}
                    </li>
                </ul>
            </div>
        </div>
        ```

5. Componente Crear Documento:
    1. add-ENTIDAD.components.ts
    ```js
    import { Component, OnInit } from '@angular/core';
    import { Libro } from 'src/app/models/libro.model';
    import { LibroService } from 'src/app/services/libro.service';

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

    ```

    2. add-ENTIDAD.components.html
    ```html
    <div>
        <div class="submit-form">
        <div *ngIf="!submitted">
            <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
                type="text"
                class="form-control"
                id="nombre"
                required
                [(ngModel)]="libro.nombre"
                name="nombre"
            />
            </div>
    
            <div class="form-group">
            <label for="descripcion">Descripcion</label>
            <input
                class="form-control"
                id="descripcion"
                required
                [(ngModel)]="libro.descripcion"
                name="descripcion"
            />
            </div>
    
            <button (click)="saveLibro()" class="btn btn-success">Enviar</button>
        </div>
    
        <div *ngIf="submitted">
            <h4>El libro fue agregado!!</h4>
            <button class="btn btn-success" (click)="newLibro()">Agregar</button>
        </div>
        </div>
    </div>
    ```
    

6. Componente Detalle Documento:
    1. ENTIDAD-details.components.ts
        ```js
            import { Component, OnInit } from '@angular/core';
            import { ActivatedRoute, Router } from '@angular/router';
            import { LibroService } from 'src/app/services/libro.service';
            import { Libro } from 'src/app/models/libro.model';

            @Component({
            selector: 'app-libro-detalle',
            //templateUrl: './libro-detalle.component.html',
            template: '<p> hola</p>',
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
            /*
            updateLibro(): void {
                this.LibroService.update(this.libroActivo.id, this.libroActivo)
                .subscribe(
                    response => {
                    console.log(response);
                    this.message = response.message;
                    },
                    error => {
                    console.log(error);
                    });
            }

            deleteLibro(): void {
                this.libroService.delete(this.libroActivo.id)
                .subscribe(
                    response => {
                    console.log(response);
                    this.enrutador.navigate(['/tutorials']);
                    },
                    error => {
                    console.log(error);
                    });
            }
            }
            */

            }
        ```
    2. ENTIDAD-details.components.html
        ```html
            <div>
                <div *ngIf="librodet.id" class="edit-form">
                    <h4>Libro</h4>
                    <form>
                        <div class="form-group">
                        <label for="nombre">nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            id="nombre"
                            [(ngModel)]="librodet.nombre"
                            name="nombre"
                        />
                        </div>
                        <div class="form-group">
                        <label for="descripcion">Descripcion</label>
                        <input
                            type="text"
                            class="form-control"
                            id="description"
                            [(ngModel)]="librodet.descripcion"
                            name="descripcion"
                        />
                        </div>
                
                    </form>
                
                    <button class="badge badge-danger mr-2" (click)="deleteLibro()">
                        Delete
                    </button>
                
                    <button
                        type="submit"
                        class="badge badge-success mb-2"
                        (click)="updateLibro()"
                    >
                        Update
                    </button>
                    <p>{{ message }}</p>
                    </div>
                
                    <div *ngIf="!librodet.id">
                    <br />
                    <p>No hay acceso a este libro...</p>
                </div>
        </div>
        ```