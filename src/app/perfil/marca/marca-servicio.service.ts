import { Injectable} from "@angular/core";
import { CLMarca,ResCLMarca } from "../../model/CLMarca";
import { Observable,of,throwError } from "rxjs";

import { catchError,tap,map } from "rxjs";

import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";


const apiUrl="http://127.0.0.1:8000/api/backend/marca/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn:'root'

})
export class MarcaServiceService{
  constructor(private http:HttpClient){}

  addMarca(marca:CLMarca): Observable<CLMarca>{
    return this.http.post<CLMarca>(apiUrl,marca,httpOptions)
  }

  getMarcas():Observable<ResCLMarca>{
    return this.http.get<ResCLMarca>(apiUrl)
  }

  getMarca(id:string): Observable<ResCLMarca>{
    return this.http.get<ResCLMarca>(apiUrl + id)

  }

  updateMarca(id:number,marca:CLMarca): Observable<CLMarca>{
    return this.http.put<CLMarca>(apiUrl+id+'/',marca,httpOptions)
  }


}
