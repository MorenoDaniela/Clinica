import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent implements OnInit {

  especialidad!:string;
  constructor(public especialidades: EspecialidadesService) { }

  ngOnInit(): void {
  }

  guardarEspecialidad()
  {
    this.especialidades.guardarEspecialidad(this.especialidad);
  }

}
