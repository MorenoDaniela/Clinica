import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HistoriaClinicaService } from 'src/app/Servicios/historia-clinica.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { Turno } from 'src/app/Clases/turno';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.css']
})
export class AltaHistoriaClinicaComponent implements OnInit {
  formulario: FormGroup;
  TurnoSeleccionado!: Turno;
  orderObj!:any;
  public Turno:any;

  @Input()
  TurnoAMostrar: any = "";
  constructor(public ingresarService: IngresarService, public fb: FormBuilder, public routeActivate: ActivatedRoute, public historiaClinicaService: HistoriaClinicaService, public toaster: ToasterService, public route: Router) {
    this.formulario=fb.group({
      Altura:["", Validators.required],
      Peso:["", Validators.required],
      Temperatura:["", [Validators.required, Validators.min(34), Validators.max(45)]],
      Presion:["", [Validators.required]],
      Clave1:["", Validators.required],
      Valor1:["", Validators.required],
      Clave2:["", Validators.required],
      Valor2:["", Validators.required],
     
    })
    this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
    console.log(this.TurnoSeleccionado.Horario);
   }

  ngOnInit(): void {
    this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
    console.log(this.TurnoSeleccionado.Horario);
      // const ob =this.routeActivate.paramMap.subscribe(params => { 
      //    console.log(params);
      //     this.TurnoSeleccionado = params.get('turno'); 
        
      // });
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
    console.log(this.TurnoSeleccionado.Horario);
  }
aceptar(){
  const historia = new HistoriaClinica();
  historia.Altura = this.formulario.controls['Altura'].value;
  historia.Peso = this.formulario.controls['Peso'].value;
  historia.Temperatura = this.formulario.controls['Temperatura'].value;
  historia.Presion = this.formulario.controls['Presion'].value;
  historia.Clave1 = this.formulario.controls['Clave1'].value;
  historia.Valor1 = this.formulario.controls['Valor1'].value;
  historia.Clave2 = this.formulario.controls['Clave2'].value;
  historia.Valor2 = this.formulario.controls['Valor2'].value;
  historia.Turno = this.TurnoSeleccionado;
  console.log(this.TurnoSeleccionado);

  this.historiaClinicaService.guardarHistoriaClinica(historia);
  this.toaster.showExito("Envio exitoso","Tus respuestas fueron enviadas con exito.",2000);
}
}
