import { Injectable } from '@angular/core';
import { ClProveedor, ResClProveedor } from '../../model/ClProveedor';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
const apiUrl = 'http://127.0.0.1:8000/api/backend/compraslist/';
const apiBoleta = 'http://127.0.0.1:8000/api/backend/boletadetalle/';
const apiFactura = 'http://127.0.0.1:8000/api/backend/facturadetalle/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ComprasServicioService {
  constructor(private http: HttpClient) {}

  addProveedor(proveedor: ClProveedor): Observable<ClProveedor> {
    return this.http.post<ClProveedor>(apiUrl, proveedor, httpOptions);
  }

  getCompras(rut: string | null) {
    return this.http.get<any>(apiUrl + rut);
  }

  getBoleta(id: string): Observable<ResClProveedor> {
    return this.http.get<ResClProveedor>(apiBoleta + id);
  }
  getFactura(id: string): Observable<ResClProveedor> {
    return this.http.get<ResClProveedor>(apiFactura + id);
  }

  updateProveedor(id: number, proveedor: ClProveedor): Observable<ClProveedor> {
    return this.http.put<ClProveedor>(
      apiUrl + id + '/',
      proveedor,
      httpOptions
    );
  }
}
