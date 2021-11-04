import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/Clases/turno';

@Component({
  selector: 'app-button-intermedio',
  templateUrl: './button-intermedio.component.html',
  styleUrls: ['./button-intermedio.component.css']
})
export class ButtonIntermedioComponent implements OnInit {
  public turnoSelect: Turno = new Turno;
  
    pasoPeliculaADetalle(event:any)
    {
      this.turnoSelect=event;
    }
  
  constructor() { }

  ngOnInit(): void {
  }

}
