import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from 'src/app/modelos/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrls: ['./detalles-pelicula.component.css']
})
export class DetallesPeliculaComponent implements OnInit {

  id: number;
  pelicula: Pelicula;
  ActError: String = "";

  registerForm = this.formBuilder.group({
    nombre:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    multimedia:['', Validators.required],
    portada:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private peliService: PeliculaService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.peliService.obtenerPeliculaID(this.id).subscribe(
      datos => {
        this.pelicula = datos;
        this.registerForm.controls.nombre.setValue(datos.nombre.toString());
        this.registerForm.controls.genero.setValue(datos.genero.toString());
        this.registerForm.controls.anio.setValue(datos.anio.toString());
        this.registerForm.controls.direccion.setValue(datos.direccion.toString());
        this.registerForm.controls.multimedia.setValue(datos.multimedia.toString());
        this.registerForm.controls.portada.setValue(datos.portada.toString());
      }
    )
  }

  get nombre(){
    return this.registerForm.controls.nombre;
  }

  get genero(){
    return this.registerForm.controls.genero;
  }

  get anio(){
    return this.registerForm.controls.anio;
  }

  get direccion(){
    return this.registerForm.controls.direccion;
  }

  get multimedia(){
    return this.registerForm.controls.multimedia;
  }

  get portada(){
    return this.registerForm.controls.portada;
  }

}
