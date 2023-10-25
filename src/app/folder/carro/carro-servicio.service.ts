import { Injectable } from '@angular/core';
import { ClCarro,ResClCarro } from '../../model/ClCarro';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/backend/carrocliente";
const apiUrlAdd = "http://127.0.0.1:8000/api/backend/carroclientepost/";
const apiUrlAddSucursal = "http://127.0.0.1:8000/api/backend/carritosucursal/";
const apiUrlerrorPago = "http://127.0.0.1:8000/api/backend/errorpago/";
const apiRetirador = "http://127.0.0.1:8000/api/backend/retirador/";
const apiUrlWebPayToken = "http://127.0.0.1:8000/api/backend/crearwebpay/";




const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class CarroServicioService {
  constructor(private http: HttpClient) { }


// RECORDAR CAMBIAR EL ID MAS ADELANTE



  getCarro(id: String): Observable<ResClCarro> {
    return this.http.get<ResClCarro>(apiUrl + "/" + id)
  }

  addDireccion( producto: any) {
    return this.http.post<any>(apiUrlAddSucursal, producto, httpOptions)  
  }

  addProducto( producto: any): Observable<ClCarro> {
    return this.http.post<any>(apiUrlAdd, producto, httpOptions)  
  }
  addProductoCart( id:string,producto: any): Observable<ClCarro> {
    return this.http.post<any>(apiUrl+ "/" + id, producto, httpOptions)  
  }
  addSucursal( producto: any) {
    return this.http.post<any>(apiUrlAddSucursal, producto, httpOptions)  
  }

  addRetirador( producto: any) {
    return this.http.post<any>(apiRetirador, producto, httpOptions)  
  }
  limpiarCart( rut: string): Observable<any> {
    return this.http.delete<any>(apiUrl+ "/" + rut, httpOptions)  
  }

  guardarDireccion( producto: any): Observable<ClCarro> {
    return this.http.post<any>(apiUrlAddSucursal, producto, httpOptions)  
  }
  pagoWebPay( datos: any) {
    return this.http.post<any>(apiUrlWebPayToken, datos, httpOptions)  
  }

  errorPago( datos: any) {
    return this.http.post<any>(apiUrlerrorPago, datos,httpOptions)  
  }




}