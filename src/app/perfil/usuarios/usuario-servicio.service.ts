import { Injectable } from '@angular/core';
import { ClUsuario } from '../../model/ClUsuario';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = 'http://localhost:3000/usuarios';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicioService {
  constructor(private http: HttpClient) {}

  addUsuario(usuario: ClUsuario): Observable<ClUsuario> {
    return this.http
      .post<ClUsuario>(apiUrl, usuario, httpOptions)
      .pipe(
        tap((usuario: ClUsuario) => console.log('added usuario w/:', usuario))
      );
  }

  getUsuarios(): Observable<ClUsuario[]> {
    return this.http
      .get<ClUsuario[]>(apiUrl)
      .pipe(tap((heroes) => console.log('fetched usuario')));
  }
  getUsuario(id: String): Observable<ClUsuario> {
    return this.http
      .get<ClUsuario>(apiUrl + '/' + id)
      .pipe(tap((_) => console.log('fetched usuario id=${id}')));
  }
  updateUsuario(id: number, usuario: ClUsuario): Observable<ClUsuario> {
    return this.http
      .put<ClUsuario>(apiUrl + '/' + id, usuario, httpOptions)
      .pipe(tap((_) => console.log('updated usuario id=${id}')));
  }
}
