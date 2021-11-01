import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Especialidad } from 'src/app/Clases/especialidad';

@Component({
  selector: 'app-detalle-especialidad',
  templateUrl: './detalle-especialidad.component.html',
  styleUrls: ['./detalle-especialidad.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DetalleEspecialidadComponent
    }
  ]
})
export class DetalleEspecialidadComponent implements OnInit {
  public Especialidad:any;
  @Input() public formulario!: FormGroup;
  @Input()
  EspecialidadAMostrar: any="";
  constructor() { }
 
  ngOnInit(): void {
  }


}
