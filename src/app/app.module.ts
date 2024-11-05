import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';            
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './Estructura/header/header.component';
import { FooterComponent } from './Estructura/footer/footer.component';
import { NavbarComponent } from './Estructura/navbar/navbar.component';
import { InicialComponent } from './Paginas/inicial/inicial.component';
import { LoginComponent } from './Paginas/login/login.component';
import { DetallesComponent } from './Paginas/detalles/detalles.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { ListaPeliculasComponent } from './Paginas/lista-peliculas/lista-peliculas.component';
import { RegistrarPeliculaComponent } from './Paginas/registrar-pelicula/registrar-pelicula.component';
import { DetallesPeliculaComponent } from './Paginas/detalles-pelicula/detalles-pelicula.component';
import { ActualizarPeliculaComponent } from './Paginas/actualizar-pelicula/actualizar-pelicula.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    InicialComponent,
    LoginComponent,
    DetallesComponent,
    ListaPeliculasComponent,
    RegistrarPeliculaComponent,
    DetallesPeliculaComponent,
    ActualizarPeliculaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
