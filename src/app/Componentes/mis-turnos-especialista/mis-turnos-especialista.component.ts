import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {
  @Output() seDisparaTurno : EventEmitter<Turno> = new EventEmitter<Turno>();
  public filter!:string;
  public comentario!:string;
  public user!:any;
  public listadoTurnos:any = [];
  public listaTurnos:any = [];
  constructor(public turnosService: TurnosService, public ingresarService: IngresarService, public toaster: ToasterService, public routes: Router) { }

  ngOnInit(): void {
    this.user = this.ingresarService.getItemLocal();
    if (this.user!=null && this.filter!=""){
      
      this.listadoTurnos = this.turnosService.firestore.collection("turnos", ref => ref.where('EspecialistaEmail', '==', this.user.Email));
      this.CargarTodosTurnos();
    }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log("en changes");
    
  }

  ngBlur(){
    console.log("en ngblur");
  }

  cargarTurnos()
  {
    this.listadoTurnos.snapshotChanges().pipe(
      map( (data: any) => {
        this.listaTurnos = new Array<Turno>();
        data.map((turno: any) =>{
          // console.log(usuario.payload);
          var nuevoTurno: Turno = new Turno();
          nuevoTurno.Especialidad = turno.payload.doc.data().Especialidad;
          nuevoTurno.EspecialistaEmail = turno.payload.doc.data().EspecialistaEmail;
          nuevoTurno.Comentario= turno.payload.doc.data().Comentario;
          nuevoTurno.Especialidad= turno.payload.doc.data().Especialidad;
          nuevoTurno.Horario = turno.payload.doc.data().Horario;
          nuevoTurno.Id = turno.payload.doc.id;
          nuevoTurno.PacienteEmail = turno.payload.doc.data().PacienteEmail;
          
          this.listaTurnos.push(nuevoTurno);
        })
      })
    ).subscribe((datos: any) => {
    });
  }

  CargarTodosTurnos()
  {      
    console.log("hola");
    this.listadoTurnos.snapshotChanges().pipe(
      map( (data: any) => {
        this.listaTurnos = new Array<Turno>();
        data.map((turnito: any) =>{
          var nuevoTurno: Turno = new Turno();
          nuevoTurno.Horario = turnito.payload.doc.data().Horario;
          nuevoTurno.Comentario = turnito.payload.doc.data().Comentario;
          nuevoTurno.Especialidad = turnito.payload.doc.data().Especialidad;
          nuevoTurno.EspecialistaEmail = turnito.payload.doc.data().EspecialistaEmail;
          nuevoTurno.Estado = turnito.payload.doc.data().Estado;
          nuevoTurno.PacienteEmail = turnito.payload.doc.data().PacienteEmail;
          nuevoTurno.Id = turnito.payload.doc.id;
          this.listaTurnos.push(nuevoTurno);     
          
                      
        })
      })
    ).subscribe();
    console.log(this.listaTurnos);
  }

  UpdateEstadoYComentario(id:string, estado:string, comentario:string){
    console.log("adentro de update"+comentario);
    if (comentario == undefined){
      this.toaster.showError("Debe ingresar comentario para poder proseguir","Error",3000);
    }else{
      this.turnosService.UpdateEstadoTurnoYComentario(id,estado,comentario);
    }
    
  }
  UpdateEstado(id:string, estado:string){
    this.turnosService.UpdateEstadoTurno(id,estado);
  }

  AHistoriaClinica(turno:any)
  {
    this.seDisparaTurno.emit(turno);
    const tu = turno;
    console.log("wtf");
    this.routes.navigate(['AltaHistoriaClinica',JSON.stringify(tu)]);//{turno: JSON.stringify(turno)}
  }

}
