import { Injectable } from '@angular/core';
import { ClRegion } from '../model/ClRegion';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://127.0.0.1:8000/api/regiones/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class RegionServicioService {
  constructor(private http: HttpClient) { }


  addRegion(region: ClRegion): Observable<ClRegion> {
    return this.http.post<ClRegion>(apiUrl, region, httpOptions)
      .pipe( 
        tap((region: ClRegion) => console.log('added region w/:',region)),
      );
  }

  getRegiones(): Observable<ClRegion[]> {
    console.log("getRegiones()");
    return this.http.get<ClRegion[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched regions')),
      );
  }
  getRegion(id: String): Observable<ClRegion> {
    
    return this.http.get<ClRegion>(apiUrl  + id)
      .pipe(
        tap(_ => console.log('fetched region id=${id}')),
      );
  }
  updateRegion(id: number, region: ClRegion): Observable<ClRegion> {
    return this.http.put<ClRegion>(apiUrl+ id+ '/', region, httpOptions)
      .pipe(
        tap(_ => console.log('updated region id=${id}')),      );
  }
}