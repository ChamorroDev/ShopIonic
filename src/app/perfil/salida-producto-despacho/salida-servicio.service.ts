
import { Injectable } from '@angular/core';
import { ClProveedor, ResClProveedor } from '../../model/ClProveedor';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
const apiUrl = 'http://127.0.0.1:8000/api/backend/salidaproductodespacho/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SalidaServicioService {
  constructor(private http: HttpClient) {}

  addProveedor(proveedor: ClProveedor): Observable<ClProveedor> {
    return this.http.post<ClProveedor>(apiUrl, proveedor, httpOptions);
  }

  getPedidoParaDespacho() {
    return this.http.get<any>(apiUrl );
  }



}
