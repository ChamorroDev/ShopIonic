import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = 'http://127.0.0.1:8000/api/backend/stockbodegas/';
const apiUrlDetalle = 'http://127.0.0.1:8000/api/backend/stockbodegasdetail/';
const apiUrlProducto = 'http://127.0.0.1:8000/api/backend/stockproducto/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StockServicioService {
  constructor(private http: HttpClient) {}

  getBodegas() {
    return this.http.get<any>(apiUrl);
  }
  getBodegaDetalle(id: number) {
    return this.http.get<any>(apiUrlDetalle + id );
  }
  getProductos() {
    return this.http.get<any>(apiUrlProducto);
  }
  getProducto(id: number) {
    return this.http.get<any>(apiUrlProducto + id + '/');
  }
}
