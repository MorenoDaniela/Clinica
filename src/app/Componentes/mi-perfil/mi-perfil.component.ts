import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Horario } from 'src/app/Clases/horario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { MisHorariosService } from 'src/app/Servicios/mis-horarios.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

 
  isAdmin!:boolean;
  user!:any;
  formulario!: FormGroup;
  espe!:any;

  constructor(public routes: Router, public ingresarService: IngresarService, public fb: FormBuilder, private fireStorage: AngularFireStorage, public toastr: ToasterService, public misHorarios: MisHorariosService) { }

  ngOnInit(): void {
    this.buildForm();
    // this.validar(this.formulario);
    this.user = this.ingresarService.getItemLocal();
    console.log(this.user);
    if(this.user!=null)
    {
      this.espe=this.user.Especialidad;
      if(this.user.TipoUsuario == "Administrador")
      {
        this.isAdmin = true;       
      }
    }

  }

  buildForm() {
    this.formulario=this.fb.group({
    //  Dias:[[],Validators.required],
    Lunes:["", []],
    Martes:["", []],
    Miercoles:["", []],
    Jueves:["", []],
    Viernes:["", []],
    Sabado:["", []],
      Desde:[0, [Validators.required, Validators.min(8), Validators.max(19)]],
      Hasta:[0, [Validators.required, Validators.min(8), Validators.max(19)]],
      DesdeSabado:[0,[Validators.required, Validators.min(8), Validators.max(14)]],
      HastaSabado:[0,[Validators.required, Validators.min(8), Validators.max(14)]],
      Especialidad:["", []],   
    })
  }

  enviar()
  {
    const Lunes = this.formulario.controls['Lunes'].value;
    const Martes = this.formulario.controls['Martes'].value;
    const Miercoles = this.formulario.controls['Miercoles'].value;
    const Jueves = this.formulario.controls['Jueves'].value;
    const Viernes = this.formulario.controls['Viernes'].value;
    const Sabado = this.formulario.controls['Sabado'].value;
    const Desde = this.formulario.controls['Desde'].value;
    const Hasta = this.formulario.controls['Hasta'].value;
    const DesdeSabado = this.formulario.controls['DesdeSabado'].value;
    const HastaSabado = this.formulario.controls['HastaSabado'].value;
    const Especialidad = this.formulario.controls['Especialidad'].value;
  //   const Dias: Array<{dia: string; valor: boolean}> = [
  //     { dia: "Lunes", valor: Lunes },
  //     { dia: "Martes", valor: Martes },
  //     { dia: "Miercoles", valor: Miercoles },
  //     { dia: "Jueves", valor: Jueves },
  //     { dia: "Viernes", valor: Viernes },
  //     { dia: "Sabado", valor: Sabado },
  //     { dia: "Desde", valor: Desde },
  //     { dia: "Hasta", valor: Hasta },
  //     { dia: "DesdeSabado", valor: DesdeSabado },
  //     { dia: "HastaSabado", valor: HastaSabado },
  //     { dia: "Especialidad", valor: Especialidad}
  // ];
  console.log(Desde);
  var horario = new Horario(Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Desde,Hasta,DesdeSabado,HastaSabado);
  console.log(horario);
  // console.log(this.Dias+this.Desde+this.Hasta+this.DesdeSabado+this.HastaSabado, this.user);
  this.ingresarService.UpdateMishorarios(this.user.Id,horario);
  this.toastr.showExito("Se registraron sus horarios con exito","Tus datos fueron enviados con exito.",2000);
  
  }
  

}
