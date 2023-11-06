import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = 'http://127.0.0.1:8000/api/backend/salidaproductodespacho/';
const apiUrlProducto =
  'http://127.0.0.1:8000/api/backend/salidadetallepedidostock/';

const apiUrlCrearSalida =
  'http://127.0.0.1:8000/api/backend/crearsalidaproductodespacho/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SalidaServicioService {
  constructor(private http: HttpClient) {}

  getPedidoParaDespacho() {
    return this.http.get<any>(apiUrl);
  }
  getProducto(id: number, data: any) {
    return this.http.post<any>(apiUrlProducto + id + '/', data, httpOptions);
  }
  send_Producto(id: any, data: any) {
    return this.http.post<any>(apiUrlCrearSalida + id + '/', data, httpOptions);
  }
}
