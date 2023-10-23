import { Injectable } from '@angular/core';
import { ClCategoria } from '../../model/ClCategoria';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/empleados/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServicioService {
  constructor(private http: HttpClient) { }


  addCategoria(categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.post<ClCategoria>(apiUrl, categoria, httpOptions)
      .pipe( 
        tap((categoria: ClCategoria) => console.log('added categoria w/:',categoria)),
      );
  }

  getCategorias(): Observable<ClCategoria[]> {
    console.log("getCategorias()");
    return this.http.get<ClCategoria[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched categorias')),
      );
  }
  getCategoria(id: String): Observable<ClCategoria> {
    
    return this.http.get<ClCategoria>(apiUrl  + id)
      .pipe(
        tap(_ => console.log('fetched categoria id=${id}')),
      );
  }
  updateCategoria(id: number, categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.put<ClCategoria>(apiUrl+ id+ '/', categoria, httpOptions)
      .pipe(
        tap(_ => console.log('updated categoria id=${id}')),      );
  }
}