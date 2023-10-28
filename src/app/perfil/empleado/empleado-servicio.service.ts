import { Injectable } from '@angular/core';


import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ClEmpleado, ResEmpleado } from '../../model/ClEmpleado';

const apiUrl = "http://127.0.0.1:8000/api/backend/empleado/";
const apiUrlAdd = "http://127.0.0.1:8000/api/backend/generocargo"
const apiUrlEdit= "http://127.0.0.1:8000/api/backend/empleadoedit";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServicioService {
  constructor(private http: HttpClient) { }

  addEmpleado(empleado:ClEmpleado): Observable<ClEmpleado>{
    return this.http.post<ClEmpleado>(apiUrl,empleado,httpOptions)
  }

  getEmpleados():Observable<ResEmpleado>{
    return this.http.get<ResEmpleado>(apiUrl)
  }

  getCargoGenero():Observable<ResEmpleado>{
    return this.http.get<ResEmpleado>(apiUrlAdd)
  }


  getEmpleado(id:string):Observable<ResEmpleado>{
    return this.http.get<ResEmpleado>(apiUrl+id)
  }

  updateEmpleado(id: number){ 
    return this.http.get<any>(apiUrlEdit +"/"+ id,  httpOptions)
  }


}
