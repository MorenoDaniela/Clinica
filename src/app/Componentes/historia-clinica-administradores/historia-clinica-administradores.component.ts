import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Clases/usuario';

@Component({
  selector: 'app-historia-clinica-administradores',
  templateUrl: './historia-clinica-administradores.component.html',
  styleUrls: ['./historia-clinica-administradores.component.css']
})
export class HistoriaClinicaAdministradoresComponent implements OnInit {
  public usuarioSeleccionado: Usuario = new Usuario;
  constructor() { }

  ngOnInit(): void {
  }
  pasoUsuarioADetalle(event:any)
  {
    this.usuarioSeleccionado=event;
  }
}
