import { Injectable } from "@angular/core";
import { ClBodega,ResCLBodega } from "src/app/model/ClBodega";
import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl = "https://127.0.0.1:8000/api/backend/bodega/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
    providedIn: 'root'
})
export class BodegaServiceService{
    constructor(private http:HttpClient){ }

    addBodega(bodega:ClBodega): Observable<ClBodega>{
        return this.http.post<ClBodega>(apiUrl,bodega,httpOptions)
    }

    getBodegas() : Observable<ResCLBodega>{
        return this.http.get<ResCLBodega>(apiUrl)
    }

    getBodega(id:string) : Observable<ResCLBodega>{
        return this.http.get<ResCLBodega>(apiUrl + id)
    }

    updateBodega(id:number,bodega:ClBodega): Observable<ClBodega>{
        return this.http.put<ClBodega>(apiUrl + id + '/',bodega,httpOptions)
      }
}
