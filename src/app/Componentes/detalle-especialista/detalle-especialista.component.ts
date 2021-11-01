import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-detalle-especialista',
  templateUrl: './detalle-especialista.component.html',
  styleUrls: ['./detalle-especialista.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DetalleEspecialistaComponent
    }
  ]
})
export class DetalleEspecialistaComponent implements OnInit {
  public Especialista:any;
  @Input() public formulario!: FormGroup;
  @Input()
  EspecialistaAMostrar: any = "";
  constructor() { }

  ngOnInit(): void {
  }

}
