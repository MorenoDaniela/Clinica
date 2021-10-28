import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-especialista',
  templateUrl: './detalle-especialista.component.html',
  styleUrls: ['./detalle-especialista.component.css']
})
export class DetalleEspecialistaComponent implements OnInit {
  @Input()
  EspecialistaAMostrar: any = "";
  constructor() { }

  ngOnInit(): void {
  }

}
