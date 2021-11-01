import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-detalle-dia-hora',
  templateUrl: './detalle-dia-hora.component.html',
  styleUrls: ['./detalle-dia-hora.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DetalleDiaHoraComponent
    }
  ]
})
export class DetalleDiaHoraComponent implements OnInit {
  public Turno:any;
  @Input() public formulario!: FormGroup;

  @Input()
  TurnoAMostrar: any = "";
  constructor() { }

  ngOnInit(): void {
  }

  // writeValue(turno: string) {
  //   this.Turno = turno;
  // }
  
  // onChange = (turno:any) => {};

  // onTouched = () => {};

  // // registerOnChange(onChange: any): void {
  // //   this.onChange = onChange;
  // // }
  // registerOnTouched(onTouched: any) {
  //   this.onTouched = onTouched;
  // }

}
