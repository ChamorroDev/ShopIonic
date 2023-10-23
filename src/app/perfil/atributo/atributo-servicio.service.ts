import { Injectable } from "@angular/core";
import { ClAtributo,ResClAtributo } from "../../model/ClAtributo";
import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";

const apiUrl = "http://127.0.0.1:8000/api/backend/atributo/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class AtributoServiceService{
  constructor(private http:HttpClient){ }

  addAtributo(atributo:ClAtributo): Observable<ClAtributo>{
    return this.http.post<ClAtributo>(apiUrl,atributo,httpOptions)
  }

  getAtributos(): Observable<ResClAtributo>{
    return this.http.get<ResClAtributo>(apiUrl)
  }

  getAtributo(id:string): Observable<ResClAtributo>{
    return this.http.get<ResClAtributo>(apiUrl + id)
  }

  updateAtributo(id:number,atributo:ClAtributo): Observable<ClAtributo>{
    return this.http.put<ClAtributo>(apiUrl + id + '/',atributo,httpOptions)
  }
}