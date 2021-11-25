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