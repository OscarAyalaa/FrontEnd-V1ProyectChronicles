import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/modelos/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-registrar-pelicula',
  templateUrl: './registrar-pelicula.component.html',
  styleUrls: ['./registrar-pelicula.component.css']
})
export class RegistrarPeliculaComponent implements OnInit {

  registroError: string = "";

  registerForm = this.formBuilder.group({
    nombre:['', Validators.required],
    genero:['', Validators.required],
    anio:['', Validators.required],
    direccion:['', Validators.required],
    multimedia:['', Validators.required],
    portada:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }
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


  guardarPelicula(){
    if(this.registerForm.valid){
      this.peliculaService.guardarPelicula(this.registerForm.value as unknown as Pelicula).subscribe({
        next: (userData) =>{
          console.log(userData);
        },
        error: (errorData) =>{
          console.error(errorData);
          this.registroError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/lista-peliculas');
          this.registerForm.reset();
        }
      })

    }else{
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }

}
