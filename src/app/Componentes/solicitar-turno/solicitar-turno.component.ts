import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Especialidad } from 'src/app/Clases/especialidad';
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
  public formulario!: FormGroup;
  public EspecialidadSeleccionada: Especialidad= new Especialidad;
  public EspecialistaSeleccionado: Usuario = new Usuario;
  public TurnoSeleccionado:string = "";
  public listadoEspecialidades:any = [];
  public listaEspecialidades:any = [];
  public listadoEspecialistas:any = [];
  public listaEspecialistas:any = [];
  public especiality!:string;
  // formulario!: FormGroup;
  public user:any;

  constructor(public routes: Router, public ingresarService: IngresarService,private fireStorage: AngularFireStorage, public toastr: ToasterService,public especialidades: EspecialidadesService,public fb: FormBuilder, public turnosService: TurnosService) { }

  ngOnInit(): void {
    this.user = this.ingresarService.getItemLocal();
    this.buildForm();
    this.listadoEspecialidades = this.especialidades.firestore.collection("especialidades", ref => ref.orderBy('nombre'));
    this.listadoEspecialistas = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Especialista'));
    this.formulario.valueChanges.subscribe(newVal =>console.log(newVal));
    // this.cargarEspecialidades();
  
  }
  
  buildForm() {
    this.formulario=this.fb.group({
      Especialidad:[this.EspecialidadSeleccionada, Validators.required],
      Especialista:[this.EspecialistaSeleccionado, Validators.required],
      Fecha:[this.TurnoSeleccionado],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.TurnoSeleccionado!="")
    { console.log(this.TurnoSeleccionado);
      console.log("entre");
    }
  }
 
  aceptar()
  {
    const turno = new Turno();
    turno.Horario = this.TurnoSeleccionado;
    turno.EspecialistaEmail = this.EspecialistaSeleccionado.Email;
    turno.Especialidad = this.EspecialidadSeleccionada.nombre;
    turno.PacienteEmail = this.user.Email;
    turno.Comentario ="";
    turno.Estado="Inicial";
    turno.Id = this.user.Id;
    console.log(turno);
    this.turnosService.guardarTurno(turno);
    this.toastr.showExito("Se envio su turno con exito","Turno enviado.",2000);
  }

  pasoEspecialidadADetalle(event:any)
  {
    this.EspecialidadSeleccionada=event;
  }
  pasoEspecialistaADetalle(event:any)
  {
    this.EspecialistaSeleccionado=event;
  }
  pasoTurnoADetalle(event:any)
  {
    this.TurnoSeleccionado=event;
  }

}
