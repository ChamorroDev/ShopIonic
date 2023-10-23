import { Injectable } from '@angular/core';
import { ClCiudad } from '../model/ClCiudad';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/ciudades/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CiudaaaadServicioService {
  constructor(private http: HttpClient) { }


  addCiudad(ciudad: ClCiudad): Observable<ClCiudad> {
    return this.http.post<ClCiudad>(apiUrl, ciudad, httpOptions)
      .pipe( 
        tap((ciudad: ClCiudad) => console.log('added ciudad w/:',ciudad)),
      );
  }

  getCiudades(): Observable<ClCiudad[]> {
    console.log("getCiudades()");
    return this.http.get<ClCiudad[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched ciudades')),
      );
  }
  getCiudad(id: number): Observable<ClCiudad> {
    
    return this.http.get<ClCiudad>(apiUrl  + id)
      .pipe(
        tap(_ => console.log('fetched ciudad id=${id}')),
      );
  }
  updateCiudad(id: number, ciudad: ClCiudad): Observable<ClCiudad> {
    return this.http.put<ClCiudad>(apiUrl+ id+ '/', ciudad, httpOptions)
      .pipe(
        tap(_ => console.log('updated ciudad id=${id}')),      );
  }
}