import { Injectable } from "@angular/core";
import { CLCargo,ResCLCargo } from "../../model/CLCargo";
import { Observable,of,throwError } from "rxjs";
import { catchError,tap,map } from "rxjs";

import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";
const apiUrl="http://127.0.0.1:8000/api/backend/cargo/";
const httpOptions ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn:'root'
})
export class CargoServiceService{
  constructor(private http:HttpClient){
  }

  addCargo(cargo:CLCargo): Observable<CLCargo>{
    return this.http.post<CLCargo>(apiUrl,cargo,httpOptions)
  }

  getCargos():Observable<ResCLCargo>{
    return this.http.get<ResCLCargo>(apiUrl)
  }

  getCargo(id:string):Observable<ResCLCargo>{
    return this.http.get<ResCLCargo>(apiUrl+id)
  }

  updateCargo(id:number,cargo:CLCargo):Observable<CLCargo>{
    return this.http.put<CLCargo>(apiUrl+id+'/',cargo,httpOptions)
  }

}
