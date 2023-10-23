import { Injectable } from '@angular/core';
import { ClSucursal,ResClSucursal } from '../../model/ClSucursal';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/backend/sucursal/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class SucursalServicioService {
  constructor(private http: HttpClient) { }


  addSucursal(sucursal: ClSucursal): Observable<ClSucursal> {
    return this.http.post<ClSucursal>(apiUrl, sucursal, httpOptions)
  }

  getSucursales(): Observable<ResClSucursal> {
    return this.http.get<ResClSucursal>(apiUrl)
      
  }
  getSucursal(id: string): Observable<ResClSucursal> {
    return this.http.get<ResClSucursal>(apiUrl  + id)
      
  }
  updateSucursal(id: number, sucursal: ClSucursal): Observable<ClSucursal> {
    return this.http.put<ClSucursal>(apiUrl+ id+ '/', sucursal, httpOptions)
      
  }
}