import { Injectable } from '@angular/core';
import { ClDireccion,ResClDireccion } from "../../model/ClDireccion";


import { Observable,of,throwError } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl = "http://127.0.0.1:8000/api/backend/ciudadregion/";

const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CiudadServicioService {

  constructor(private http:HttpClient){ }

  addDireccion(genero:ClDireccion): Observable<ClDireccion>{
    return this.http.post<ClDireccion>(apiUrl,genero,httpOptions)
  }
 
  // TODAS LAS DIRECCIONES
  getTodo(): Observable<ResClDireccion>{
    return this.http.get<ResClDireccion>(apiUrl )
  }
  // TODAS DETALE 1 CLIENTE
  getDireccion(id:string): Observable<ResClDireccion>{
    return this.http.get<ResClDireccion>(apiUrl + id)
  }

  updateDireccion(id:number,genero:ClDireccion): Observable<ClDireccion>{
    return this.http.put<ClDireccion>(apiUrl + id + '/',genero,httpOptions)
  }
}
