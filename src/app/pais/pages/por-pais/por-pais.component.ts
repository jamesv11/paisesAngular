import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino:string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugerencia : Country[] = [];
  mostrarSugerencias : boolean = false;


  constructor(private paisService: PaisService){}

  buscar(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe((paises) => {
      this.paises = paises;    
    },(err) => {
      this.hayError = true;
      this.paises = [];
    } );
    
  }

  sugerencias(termino:string){
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino).subscribe(
      (paises) => this.paisesSugerencia = paises.splice(0,5),
     (err) => this.paisesSugerencia = [])
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }
}
