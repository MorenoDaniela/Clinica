import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  public EspecialidadSeleccionada: string = "";
  public EspecialistaSeleccionado: string = "";
  public listadoEspecialidades:any = [];
  public listaEspecialidades:any = [];
  public listadoEspecialistas:any = [];
  public listaEspecialistas:any = [];
  public especiality!:string;
  formulario!: FormGroup;

  constructor(public routes: Router, public ingresarService: IngresarService,private fireStorage: AngularFireStorage, public toastr: ToasterService,public especialidades: EspecialidadesService,public fb: FormBuilder, public turnosService: TurnosService) { }

  ngOnInit(): void {
    this.buildForm();
    this.listadoEspecialidades = this.especialidades.firestore.collection("especialidades", ref => ref.orderBy('nombre'));
    this.listadoEspecialistas = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Especialista'));
    this.cargarEspecialidades();
   
  }
  
  buildForm() {
    this.formulario=this.fb.group({
      Fecha:["",[ Validators.required, this.validarFecha]],
      Hora:["", Validators.required],
      Especialista:["", Validators.required],
      EspecialidadSeleccionada:["", Validators.required]
    })
  }

 

  validarFecha(control: AbstractControl)
  {
    let today = new Date();
    const fecha = control.value;
    let to = new Date();
    let quinceDias = today.setDate(today.getDate() + 15);
    
    if(fecha!=null)
    {
      console.log(today);
      let fechaParse = new Date(fecha);
      console.log("today " + to.getTime()+ "15 dsps " +quinceDias);
      if (fechaParse.getTime()<to.getTime()|| fechaParse.getTime()>quinceDias)
      {
        return {estaMal:true};
      }
    }
   
    return null;
  }
  

  aceptar()
  {
    const Fecha = this.formulario.controls['Fecha'].value;
    const Hora = this.formulario.controls['Hora'].value;
    const turno = new Turno();
    turno.Horario = Fecha + "-" + Hora;
    this.turnosService.guardarTurno(turno);
    this.toastr.showExito("Se envio su turno con exito","Turno enviado.",2000);
  }

  cargarEspecialidades()
{
  this.listadoEspecialidades.snapshotChanges().pipe(
    map( (data: any) => {
      this.listaEspecialidades = new Array<string>();
      data.map((especialidad: any) =>{
        // console.log(especialidad);
        var especialidad2: string ;
        especialidad2 = especialidad.payload.doc.data().nombre;
      //  console.log(especialidad2);
        this.listaEspecialidades.push(especialidad2);
      })
    })
  ).subscribe((datos: any) => {
  });
 }
   
 buscarEspecialistas()
 {
  this.listaEspecialistas = new Array<Usuario>();
  let especi = (<HTMLInputElement>document.getElementById('selectEspecialidad')).value;
  console.log(especi);
   this.listadoEspecialistas.snapshotChanges().pipe(
     map( (data: any) => {
       
       data.map((usuario: any) =>{
         console.log(usuario.payload.doc.data().Especialidad.includes(especi));
         if (usuario.payload.doc.data().Especialidad.includes(especi))
         {
          console.log(usuario.payload.doc.data().Especialidad);
          var usuario2: Usuario = new Usuario();
          usuario2.Nombre = usuario.payload.doc.data().Nombre;
          usuario2.Email = usuario.payload.doc.data().Email;
          usuario2.DNI= usuario.payload.doc.data().DNI;
          usuario2.Especialidad= usuario.payload.doc.data().Especialidad;
          usuario2.Apellido = usuario.payload.doc.data().Apellido;
          usuario2.Id = usuario.payload.doc.id;
          usuario2.Aprobado = usuario.payload.doc.data().Aprobado;
          // console.log(usuario2);
          this.listaEspecialistas.push(usuario2);
         }       
       })
     })
   ).subscribe((datos: any) => {
   });
  }

  pasoEspecialidadADetalle(event:any)
  {
    this.EspecialidadSeleccionada=event;
  }
  pasoEspecialistaADetalle(event:any)
  {
    this.EspecialistaSeleccionado=event;
  }
  
}
