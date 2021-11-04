import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-detalle-dia-hora',
  templateUrl: './detalle-dia-hora.component.html',
  styleUrls: ['./detalle-dia-hora.component.css']
})
export class DetalleDiaHoraComponent implements OnInit{
  // @Input() ControladorFecha!: FormGroup;
  public Turno:any;

  @Input()
  TurnoAMostrar: any = "";
  constructor() { }
 

  ngOnInit(): void {

  }


}
