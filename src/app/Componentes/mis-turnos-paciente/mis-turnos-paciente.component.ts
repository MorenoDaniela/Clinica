import { Component, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css']
})
export class MisTurnosPacienteComponent implements OnInit {

  public filter!:string;
  public comentario!:string;
  public user!:any;
  public listadoTurnos:any = [];
  public listaTurnos:any = [];
  constructor(public turnosService: TurnosService, public ingresarService: IngresarService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.user = this.ingresarService.getItemLocal();
    if (this.user!=null && this.filter!=""){
      
      this.listadoTurnos = this.turnosService.firestore.collection("turnos", ref => ref.where('PacienteEmail', '==', this.user.Email));
      this.CargarTodosTurnos();
    }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log("en changes");
    
  }

  ngBlur(){
    console.log("en ngblur");
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
}
