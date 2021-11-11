import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Clases/usuario';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-historia-clinica-administradores',
  templateUrl: './historia-clinica-administradores.component.html',
  styleUrls: ['./historia-clinica-administradores.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class HistoriaClinicaAdministradoresComponent implements OnInit {
  public visible:boolean=true;
  public usuarioSeleccionado: Usuario = new Usuario;
  constructor() { }

  ngOnInit(): void {
  }
  pasoUsuarioADetalle(event:any)
  {
    this.usuarioSeleccionado=event;
  }
}
