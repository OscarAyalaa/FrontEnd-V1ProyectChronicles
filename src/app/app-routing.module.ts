import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicialComponent } from './Paginas/inicial/inicial.component';
import { LoginComponent } from './Paginas/login/login.component';
import { ListaPeliculasComponent } from './Paginas/lista-peliculas/lista-peliculas.component';
import { RegistrarPeliculaComponent } from './Paginas/registrar-pelicula/registrar-pelicula.component';
import { DetallesComponent } from './Paginas/detalles/detalles.component';
import { ActualizarPeliculaComponent } from './Paginas/actualizar-pelicula/actualizar-pelicula.component';
import { DetallesPeliculaComponent } from './Paginas/detalles-pelicula/detalles-pelicula.component';

const routes: Routes = [
  {path: '',redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component: InicialComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'lista-peliculas', component: ListaPeliculasComponent},
  {path: 'registrar-pelicula', component: RegistrarPeliculaComponent},
  {path: 'detalles-pelicula/:id', component: DetallesPeliculaComponent},
  {path: 'actualizar-pelicula/:id', component: ActualizarPeliculaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
