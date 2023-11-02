import { Injectable } from '@angular/core';
import { ClUsuario } from '../../model/ClUsuario';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = 'http://127.0.0.1:8000/api/backend/entradaproductoproveedor/';
const apiUrldetail =
  'http://127.0.0.1:8000/api/backend/confirmarpedidosdetalle/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GestionStockServiceService {
  constructor(private http: HttpClient) {}

  getPedidos() {
    return this.http.get<any>(apiUrl);
  }
  getPedido(id: number) {
    return this.http.get<any>(apiUrldetail + id + '/');
  }
  savePedido(id: number, data: any) {
    return this.http.post<any>(apiUrl + id + '/', data);
  }
}
