import {  Injectable } from "@angular/core";
import { ClTarjeta,ResClTarjeta } from "../../model/ClTarjeta";

import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl="http://127.0.0.1:8000/api/backend/tarjeta/";
const apiUrlCliente="http://127.0.0.1:8000/api/backend/tarjetascliente/";


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class TarjetaServiceService{
  constructor(private http:HttpClient){}

  addTarjeta(tarjetas:any):Observable<ClTarjeta>{
    return this.http.post<any>(apiUrl ,tarjetas,httpOptions)
  }

  getTarjetas(rut:number):Observable<ResClTarjeta>{
    return this.http.get<ResClTarjeta>(apiUrlCliente+rut)
  }
  getTarjetasTodas():Observable<ResClTarjeta>{
    return this.http.get<ResClTarjeta>(apiUrl)
  }

  getTarjeta(id:string):Observable<ResClTarjeta>{
    return this.http.get<ResClTarjeta>(apiUrl + id)
  }

  updateTarjeta(id:number,tarjeta:any): Observable<ClTarjeta>{
    return this.http.put<any>(apiUrl+id+"/",tarjeta,httpOptions)
  }





}
