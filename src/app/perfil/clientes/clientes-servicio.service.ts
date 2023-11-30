import { Injectable } from '@angular/core';
import { ClCliente, ClApiResp } from '../../model/ClUsuario';
import { URLAPIDJANGO } from '../../constants/URLAPI';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = URLAPIDJANGO + 'api/backend/cliente';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientesServicioService {
  constructor(private http: HttpClient) {}

  addUsuario(usuario: ClCliente): Observable<ClApiResp> {
    return this.http.post<ClApiResp>(apiUrl + '/', usuario, httpOptions);
  }

  registerCliente(cliente: any) {
    return this.http.post<any>(apiUrl + '/', cliente, httpOptions);
  }
  getClientes(): Observable<ClApiResp> {
    return this.http.get<ClApiResp>(apiUrl);
  }

  getCliente(id: String): Observable<ClApiResp> {
    return this.http.get<ClApiResp>(apiUrl + '/' + id);
  }

  updateCliente(id: number, usuario: ClCliente): Observable<ClApiResp> {
    return this.http.post<ClApiResp>(apiUrl + '/' + id, usuario, httpOptions);
  }
}
