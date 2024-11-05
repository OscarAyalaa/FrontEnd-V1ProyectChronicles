import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../modelos/api-response';
import { Page } from '../modelos/page';
import { environment } from 'src/environments/environment';
import { Pelicula } from '../modelos/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }

  // Make call to the back and API to retrive page of peliculas
  pelis$ = (name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> =>
    this.http.get<any>(environment.urlHost+`peliculas?name=${name}&page=${page}&size=${size}`)

  // getPelicula(name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Pelicula>> {
  //   return this.http.get<ApiResponse<Pelicula>>(`${this.serverUrl}/peliculas?$name=${name}&page=${page}&size=${size}`)
  // }

  guardarPelicula(pelicula: Pelicula): Observable<Object>{
    return this.http.post(environment.urlHost+`peliculas`, pelicula);
  }

  obtenerPeliculaID(id: number): Observable<Pelicula>{
    return this.http.get<Pelicula>(environment.urlHost+`peliculas/`+id);
  }

  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Object>{
    return this.http.put(environment.urlHost+`peliculas/`+id, pelicula);
  }

  eliminarPelicula(id: number): Observable<Object>{
    return this.http.delete(environment.urlHost+`peliculas/`+id);
  }

}
