import { Injectable } from "@angular/core";
import { CLGenero,ResCLGenero } from "../../model/CLGenero";
import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl = "http://127.0.0.1:8000/api/backend/genero/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService{
  constructor(private http:HttpClient){ }

  addGenero(genero:CLGenero): Observable<CLGenero>{
    return this.http.post<CLGenero>(apiUrl,genero,httpOptions)
  }

  getGeneros(): Observable<ResCLGenero>{
    return this.http.get<ResCLGenero>(apiUrl)
  }

  getGenero(id:string): Observable<ResCLGenero>{
    return this.http.get<ResCLGenero>(apiUrl + id)
  }

  updateGenero(id:number,genero:CLGenero): Observable<CLGenero>{
    return this.http.put<CLGenero>(apiUrl + id + '/',genero,httpOptions)
  }
}
