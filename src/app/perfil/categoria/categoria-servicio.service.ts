import { Injectable } from '@angular/core';
import { ClCategoria,ResClCategoria } from '../../model/ClCategoria';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/backend/categoria/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  constructor(private http: HttpClient) { }

  addCategoria(categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.post<ClCategoria>(apiUrl, categoria, httpOptions)
      
  }

  getCategorias(): Observable<ResClCategoria> {
    return this.http.get<ResClCategoria>(apiUrl)
    
  }
  getCategoria(id: String): Observable<ResClCategoria> {
    return this.http.get<ResClCategoria>(apiUrl  + id)
     
  }
  updateCategoria(id: number, categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.put<ClCategoria>(apiUrl+ id+ '/', categoria, httpOptions)
      
  }
}