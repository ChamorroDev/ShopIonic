import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { ClUsuario, ClApiResp } from '../model/ClUsuario';
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs/operators';
import { globalData } from 'src/app/constants/user';

const apiUrl = 'http://127.0.0.1:8000/api/backend/log/';
const apiclave = 'http://127.0.0.1:8000/api/backend/cambiarclave/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<ClApiResp>(apiUrl, { username, password }, httpOptions)
      .pipe(tap((res: any) => this.setSession(res)));
  }

  cambiar(user: string, clave: string) {
    return this.http.post<ClApiResp>(apiclave, { user, clave }, httpOptions);
  }

  whoLogin() {
    return localStorage.getItem('username') + '';
  }

  private setSession(authResult: any) {
    if (authResult.registro !== 'error') {
      localStorage.setItem('id_token', authResult.registro.access_token);
      localStorage.setItem('username', authResult.registro.username);
      localStorage.setItem('rut', authResult.registro.rut);

      globalData.RUT_CLIENTE = authResult.registro.rut;
    } else {
      localStorage.removeItem('id_token');
      localStorage.removeItem('username');
      localStorage.removeItem('rut');
      globalData.RUT_CLIENTE = '1';
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.setItem('username', 'Invitado');
    localStorage.removeItem('rut');
  }

  isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }

  static rutCliente(): string {
    const rut = localStorage.getItem('rut');
    return rut !== null ? rut : '1';
  }
}
