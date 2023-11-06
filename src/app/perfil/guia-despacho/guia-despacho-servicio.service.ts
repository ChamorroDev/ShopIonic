import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://127.0.0.1:8000/api/backend/listaguiasdespacho/';
const apiUrlDetalle = 'http://127.0.0.1:8000/api/backend/detalleguiadespacho/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GuiaDespachoServicioService {
  constructor(private http: HttpClient) {}

  getGuiasDespacho() {
    return this.http.get<any>(apiUrl);
  }
  getGuiaDespacho(id: any) {
    return this.http.get<any>(apiUrlDetalle + id + '/');
  }
}
