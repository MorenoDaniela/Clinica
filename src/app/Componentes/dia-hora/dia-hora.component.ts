// import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
// import { newArray } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
// import { notStrictEqual } from 'assert';
import { Usuario } from 'src/app/Clases/usuario';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-dia-hora',
  templateUrl: './dia-hora.component.html',
  styleUrls: ['./dia-hora.component.css']
})
export class DiaHoraComponent implements OnInit {
  // @Input() public formulario!: FormGroup ;
  @Input()
  EspecialistaAMostrar: Usuario = new Usuario;
  @Output() eventoTurnoSeleccionado : EventEmitter<string> = new EventEmitter<string>();
  public listaDias:any =[];
  public listaHoras:any =[];
  public desde:any;
  public hasta:any;
  public listaDiasSabado:any =[];
  public listaHorasSabado:any =[];
  public nuevoArray:any =[];
  public nuevoArraySabado:any =[];
  public otroArray:any=[];
  public desdeSabado:any;
  public hastaSabado:any;
  public turno!:string;
  listadoTurnos: any;
  listaTurnos:any;
  public listadoDefinitivo:any =[];

  constructor(private rootFormGroup: FormGroupDirective, public turnosService: TurnosService, public toaster: ToasterService) {
    
   }

  ngOnInit(): void {
   
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.EspecialistaAMostrar!=null)
    { 
      this.listadoTurnos =this.turnosService.firestore.collection("turnos", ref =>ref.orderBy('Horario'));
      this.CallFunctions();    
    }
  }

  CallFunctions()
  {
    this.listaDias = this.GenerarDias();
    this.listaHoras = this.GenerarHoras();
    this.listaDiasSabado = this.GenerarDias();
    this.listaHorasSabado = this.GenerarHorasSabado();
    this.nuevoArray = this.VerificarSiDiaLaborable();
    this.nuevoArraySabado = this.VerificarSabado();
    this.JuntarArrays();
    this.CargarTodosTurnos();
    this.VerificarDisponibilidad();
  }

  CargarTodosTurnos()
  {    
  var email = this.EspecialistaAMostrar.Email;
  
  
    this.listadoTurnos.snapshotChanges().pipe(
      map( (data: any) => {
        // this.listaTurnos = new Array<Turno>();
        data.map((turnito: any) =>{
          // if (this.EspecialistaAMostrar.Email == turnito.payload.doc.data().EspecialistaEmail && 
          // turnito.payload.doc.data().Horario == this.turno){
          //   this.toaster.showError("Turno ya ocupado","Error",3000);
          // }
          var nuevoTurno: Turno = new Turno();
          nuevoTurno.Horario = turnito.payload.doc.data().Horario;
          nuevoTurno.Comentario = turnito.payload.doc.data().Comentario;
          nuevoTurno.Especialidad = turnito.payload.doc.data().Especialidad;
          nuevoTurno.EspecialistaEmail = turnito.payload.doc.data().EspecialistaEmail;
          nuevoTurno.Estado = turnito.payload.doc.data().Estado;
          nuevoTurno.PacienteEmail = turnito.payload.doc.data().PacienteEmail;
          nuevoTurno.Id = turnito.payload.doc.data().Id;
          this.listaTurnos.push(nuevoTurno);     
          
                      
        })
      })
    ).subscribe();
    console.log(this.listaTurnos);
  }

   VerificarDisponibilidad()
  {
    // this.listadoDefinitivo=[];
    for (var i=0;i<this.otroArray.length;i++){
      for (var j=0;j<this.listaTurnos.length;j++){
       
        if (this.otroArray[i]!= this.listaTurnos[j].Horario && this.EspecialistaAMostrar.Email!=this.listaTurnos[j].EspecialistaEmail)
        {
          // console.log(this.otroArray[i] + " " + this.listaTurnos[j].Horario)
          this.listadoDefinitivo.push(this.otroArray[i])
        }
        if (this.otroArray[i]== this.listaTurnos[j].Horario && this.EspecialistaAMostrar.Email==this.listaTurnos[j].EspecialistaEmail)
        {
          console.log(this.otroArray[i] + " " + this.listaTurnos[j].Horario)
          // this.listadoDefinitivo.push(this.otroArray[i])
        }
      }
    }
   console.log(this.listadoDefinitivo);
  }

  JuntarArrays()
  {
    this.otroArray=[];
      for (var i=0;i<this.nuevoArray.length;i++){
        for (var j=0;j<this.listaHoras.length;j++){
          var element = this.nuevoArray[i].dia + "-" + this.nuevoArray[i].mes +" "+ this.listaHoras[j];
          this.otroArray.push(element);
        }
      }
      for (var i=0;i<this.nuevoArraySabado.length;i++){
        for (var j=0;j<this.listaHorasSabado.length;j++){
          var element = this.nuevoArraySabado[i].dia + "-" + this.nuevoArraySabado[i].mes +" "+ this.listaHorasSabado[j];
          this.otroArray.push(element);
        }
      }
  }
  GenerarHoras()
  {
    var result = [];  
    var horasCompletas:any=[];                   
    var desde = this.EspecialistaAMostrar.Desde;
    var hasta = this.EspecialistaAMostrar.Hasta;
    for(var i = parseInt(desde); i < parseInt(hasta); i++){
      result[i]=(i + ":30");
      result[i+parseInt(hasta)]=(i+":00"); 
    }
    result.forEach(element=>{
      if (element!=null){
        horasCompletas.push(element);
      }
    });
    return horasCompletas;
  }

  GenerarHorasSabado()
  {
    var result = [];  
    var horasCompletas:any=[];                   
    var desde = this.EspecialistaAMostrar.DesdeSabado;
    var hasta = this.EspecialistaAMostrar.HastaSabado;
    for(var i = parseInt(desde); i < parseInt(hasta); i++){
      result[i]=(i + ":30");
      result[i+parseInt(hasta)]=(i+":00"); 
    }
    result.forEach(element=>{
      if (element!=null){
        horasCompletas.push(element);
      }
    });
    return horasCompletas;
  }

  addDays(date:any, days:any) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  GenerarDias()
  {
    // var newArray:any=[];
    // var otroArray:any=[];
    var tomorrow = this.addDays(new Date(),1);
    var quinceDias = this.addDays(new Date(),15);

    // console.log(new Date().toDateString());
    var getDaysArray = function(s:any,e:any) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
    var dateRange = getDaysArray(new Date(tomorrow), new Date(quinceDias));
    // var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var result2 = dateRange.map(function(elem:any){ 
        var obj =  {     
          dia: elem.getDate(),
          mes: elem.toLocaleString().split("/")[1],
          semana: elem.toDateString().split(" ")[0]     
        }    
        return obj;
        });
    // console.log(result2);
    return result2;
  }

  VerificarSiDiaLaborable()
  {
    var newArray = [];
   for(var i=0;i<this.listaDias.length;i++)
   {
     if (this.listaDias[i].semana=="Mon" && this.EspecialistaAMostrar.Lunes==true)
     {
       newArray.push(this.listaDias[i]);
     }
     if (this.listaDias[i].semana=="Tue" && this.EspecialistaAMostrar.Martes==true)
     {
      newArray.push(this.listaDias[i]);
     }
     if (this.listaDias[i].semana=="Wed" && this.EspecialistaAMostrar.Miercoles==true)
     {
      newArray.push(this.listaDias[i]);
     }
     if (this.listaDias[i].semana=="Thu" && this.EspecialistaAMostrar.Jueves==true)
     {
      newArray.push(this.listaDias[i]);
     }
     if (this.listaDias[i].semana=="Fri" && this.EspecialistaAMostrar.Viernes==true)
     {
      newArray.push(this.listaDias[i]);
     }
    //  if (this.listaDias[i].semana=="Sat")
    //  {
    //   newArray.push(this.listaDias[i]);
    //  }  
    //  if (this.listaDias[i].semana=="Sun")
    //  {
    //   newArray.push(this.listaDias[i]);
    //  }
    
   }
   return newArray;
  }

  VerificarSabado()
  {
    var newArray = [];
    for(var i=0;i<this.listaDiasSabado.length;i++)
    {     
     if (this.listaDiasSabado[i].semana=="Sat" && this.EspecialistaAMostrar.Sabado==true)
      {
        newArray.push(this.listaDiasSabado[i]);
      }
      
  }
  return newArray;
  }
  
  emitirTurno(turno:string)
  {
    this.turno = turno;
     this.eventoTurnoSeleccionado.emit(turno);
  }
 
}
