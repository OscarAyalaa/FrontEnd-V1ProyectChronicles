import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/modelos/api-response';
import { Page } from 'src/app/modelos/page';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {

  peliState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new  BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private peliService: PeliculaService, private router: Router) { }

  ngOnInit(): void {
    
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.peliState$ = this.peliService.pelis$().pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response});
      }
    ),
    startWith({ appState: 'APP_LOADING' }),
    catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error}))
    )
  }

  goToPage(name?: string, pageNumber: number = 0): void{
    this.peliState$ = this.peliService.pelis$(name, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: this.responseSubject.value});
      }
    ),
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
    catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error }))
    )
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void{
    this.goToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  eliminarPelicula(id: number){
    this.peliService.eliminarPelicula(id).subscribe(
      datos => {
        this.ngOnInit();
        console.log(datos);
      });
  }

  detallesPelicula(id: number){
    this.router.navigate(['/detalles-pelicula', id]);
  }

  actualizarPelicula(id: number){
    this.router.navigate(['/actualizar-pelicula', id]);
  }

  

}
