import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';

@Component({
  selector: 'app-historia-para-mostrar',
  templateUrl: './historia-para-mostrar.component.html',
  styleUrls: ['./historia-para-mostrar.component.css']
})
export class HistoriaParaMostrarComponent implements OnInit {
  @Input()
  historiaAMostrar: HistoriaClinica = new HistoriaClinica;
  constructor() { }

  ngOnInit(): void {
    console.log(this.historiaAMostrar);
  }

}
