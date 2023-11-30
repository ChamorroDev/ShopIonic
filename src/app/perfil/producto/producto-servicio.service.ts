import { Injectable } from '@angular/core';
import { ClProducto, ResClProducto } from '../../model/ClProducto';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = 'http://127.0.0.1:8000/api/backend/viewproductolist';
const apiUrlAdd = 'http://127.0.0.1:8000/api/backend/productoadd';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductoServiceService {
  constructor(private http: HttpClient) {}

  addProducto(producto: any): Observable<ClProducto> {
    return this.http.post<any>(apiUrl + '/', producto, httpOptions);
  }

  getProductosData(): Observable<ResClProducto> {
    return this.http.get<ResClProducto>(apiUrlAdd);
  }

  getProductos(): Observable<ResClProducto> {
    return this.http.get<ResClProducto>(apiUrl);
  }

  getProducto(id: String): Observable<ResClProducto> {
    return this.http.get<ResClProducto>(apiUrl + '/' + id);
  }

  updateProducto(id: number, producto: any): Observable<ClProducto> {
    return this.http.put<any>(apiUrl + '/' + id, producto, httpOptions);
  }
}
