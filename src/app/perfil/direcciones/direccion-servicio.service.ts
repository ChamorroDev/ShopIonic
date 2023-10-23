import { Injectable } from "@angular/core";
import { ClDireccion,ResClDireccion } from "../../model/ClDireccion";

import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl = "http://127.0.0.1:8000/api/backend/direccion/";
const apiUrlCliente = "http://127.0.0.1:8000/api/backend/clientedirecciones/";

const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class DireccionServicioService {

  constructor(private http:HttpClient){ }

  addDireccion(direccion:ClDireccion): Observable<ClDireccion>{
    return this.http.post<ClDireccion>(apiUrl,direccion,httpOptions)
  }
  // TODAS LAS DIRECCIONES DE 1 CLIENTE
  getDirecciones(rut:Number): Observable<ResClDireccion>{
    return this.http.get<ResClDireccion>(apiUrlCliente+rut)
  }
  // TODAS LAS DIRECCIONES
  getDireccionTodas(): Observable<ResClDireccion>{
    return this.http.get<ResClDireccion>(apiUrl )
  }
  // TODAS DETALE 1 CLIENTE
  getDireccion(id:string): Observable<ResClDireccion>{
    return this.http.get<ResClDireccion>(apiUrl + id)
  }

  updateDireccion(id:number,direccion:ClDireccion): Observable<ClDireccion>{
    return this.http.put<ClDireccion>(apiUrl + id + '/',direccion,httpOptions)
  }
}
