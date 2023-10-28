import { Injectable } from "@angular/core";
import { ClProveedor,ResClProveedor } from "../../model/ClProveedor";
import { Observable,of,throwError } from "rxjs";
import { catchError,tap,map } from "rxjs";

import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";
const apiUrl="http://127.0.0.1:8000/api/backend/proveedor/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
    providedIn:'root'
  })
  export class ProveedorServiceService{
    constructor(private http:HttpClient){

    }

    addProveedor(proveedor:ClProveedor):Observable<ClProveedor>{
        return this.http.post<ClProveedor>(apiUrl,proveedor,httpOptions)
      }
    
    getProveedores():Observable<ResClProveedor>{
        return this.http.get<ResClProveedor>(apiUrl)
      }
    
    getProveedor(id:string):Observable<ResClProveedor>{
        return this.http.get<ResClProveedor>(apiUrl+id)
      }
    
    updateProveedor(id:number,proveedor:ClProveedor):Observable<ClProveedor>{
        return this.http.put<ClProveedor>(apiUrl+id+'/',proveedor,httpOptions)
      }
    















  }