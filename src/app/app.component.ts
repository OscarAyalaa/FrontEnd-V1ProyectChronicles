import { Component, OnInit } from '@angular/core';
import { PeliculaService } from './services/pelicula.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  actualUrl: String;
  title = 'V1ProyectChronicles';

  constructor(private peliervice: PeliculaService) {}

  ngOnInit(): void {
    this.actualUrl = document.URL;
  }

}
