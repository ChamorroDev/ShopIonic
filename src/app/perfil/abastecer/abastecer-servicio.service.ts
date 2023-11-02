import { Injectable } from '@angular/core';
import { ClProducto } from '../../model/ClProducto';
import { Observable, of, throwError } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
const apiUrl = 'http://127.0.0.1:8000/api/backend/productoproveedorlist/';
const apiUrlProducto = 'http://127.0.0.1:8000/api/backend/abastecerproducto/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AbastecerServicioService {
  constructor(private http: HttpClient) {}

  getProducto(id: string) {
    return this.http.get<any>(apiUrl + id);
  }

  abastecerProducto(data: any) {
    return this.http.post<any>(apiUrlProducto, data, httpOptions);
  }
}
