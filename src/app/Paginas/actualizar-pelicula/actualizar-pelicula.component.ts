import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from 'src/app/modelos/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-actualizar-pelicula',
  templateUrl: './actualizar-pelicula.component.html',
  styleUrls: ['./actualizar-pelicula.component.css']
})
export class ActualizarPeliculaComponent implements OnInit {
  registroError: string = "";

  id: number;
  pelicula: Pelicula;

  registerForm = this.formBuilder.group({
    nombre:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    multimedia:['', Validators.required],
    portada:['', Validators.required]
  })
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private peliService: PeliculaService) { }

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

  actualizarPelicula(){
    this.peliService.actualizarPelicula(this.pelicula.id, this.registerForm.value as unknown as Pelicula).subscribe(
      datos => {
        this.router.navigate(['lista-peliculas']);
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
