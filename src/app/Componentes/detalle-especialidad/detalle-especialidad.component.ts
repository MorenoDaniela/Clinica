import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detalle-especialidad',
  templateUrl: './detalle-especialidad.component.html',
  styleUrls: ['./detalle-especialidad.component.css']
})
export class DetalleEspecialidadComponent implements OnInit {
 
  constructor() { }
  @Input()
  EspecialidadAMostrar: any = "";
  ngOnInit(): void {
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.EspecialidadAMostrar!="")
  //   {
  //     console.log("adentro");
  //     this.cargarPaisDelActor();
  //   }
  // }

}
