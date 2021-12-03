import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Libro } from '../models/libro.model';

const baseUrl = 'https://cap-2-12-6-lc.herokuapp.com/api/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  login(data: any): Observable<any>{
    return this.http.post(baseUrl+"/login", data)
  }

  getAll(): Observable<any>{
    return this.http.get(baseUrl)
  } 
  get(id: any): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`) // ` Alt+96
  }
  create(data: any): Observable<any>{
    return this.http.post(baseUrl, data)
  }

  deleteAll(): Observable<any>{
    return this.http.delete(baseUrl);
  }
  delete(id: any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`) // ` Alt+96
  }
  update(id:any, data: any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data);
  }


}
