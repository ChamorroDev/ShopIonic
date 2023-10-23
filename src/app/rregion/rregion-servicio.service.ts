import { Injectable } from '@angular/core';
import { ResClRegion } from '../model/ClRegion';
import { ClRegion } from '../model/ClRegion';


import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/backend/region/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class RregionServicioService {
  constructor(private http: HttpClient) { }


  addSucursal(sucursal: ClRegion): Observable<ClRegion> {
    return this.http.post<ClRegion>(apiUrl, sucursal, httpOptions)
      
  }

  getSucursales(): Observable<ResClRegion> {
    return this.http.get<ResClRegion>(apiUrl)
      
  }
  getSucursal(id: String): Observable<ResClRegion> {
    return this.http.get<ResClRegion>(apiUrl  + id)
      
  }
  updateSucursal(id: number, sucursal: ClRegion): Observable<ClRegion> {
    return this.http.put<ClRegion>(apiUrl+ id+ '/', sucursal, httpOptions)
      
  }
}