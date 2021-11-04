import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Especialidad } from 'src/app/Clases/especialidad';
import { Usuario } from 'src/app/Clases/usuario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-buttons-especialistas',
  templateUrl: './buttons-especialistas.component.html',
  styleUrls: ['./buttons-especialistas.component.css']
})

export class ButtonsEspecialistasComponent implements OnInit {

  @Output() eventoEspecialistaSeleccionado : EventEmitter<Usuario> = new EventEmitter<Usuario>();
 
  public listadoEspecialistas:any = [];
  public listaEspecialistas:any = [];

  constructor(public ingresarService: IngresarService) { 
    this.listadoEspecialistas = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Especialista'));
    this.buscarEspecialistas();
  }

ngOnChanges(changes: SimpleChanges): void {
    // if (this.EspecialidadAMostrar!=null)
    // {
    //   // console.log("adentro");
    //   // this.buscarEspecialistas();
    // }
  }
  
  ngOnInit(): void {
    // this.form = this.rootFormGroup.control;
  }

  emitirEspecialista(especialista:Usuario){
  // console.log(especialista);
    this.eventoEspecialistaSeleccionado.emit(especialista);
 }

 buscarEspecialistas(){
  this.listaEspecialistas = new Array<Usuario>();
  // let especi = (<HTMLInputElement>document.getElementById('selectEspecialidad')).value;
  // console.log("buscando especialista"+this.EspecialidadAMostrar);
   this.listadoEspecialistas.snapshotChanges().pipe(
     map( (data: any) => {
       
       data.map((usuario: any) =>{
        //  console.log(usuario.payload.doc.data().Especialidad.includes(this.EspecialidadAMostrar.nombre));
        //  if (usuario.payload.doc.data().Especialidad.includes(this.EspecialidadAMostrar.nombre))
        if (usuario.payload.doc.data().TipoUsuario=="Especialista")
         {
          // console.log(usuario.payload.doc.data().Especialidad.nombre);
          var usuario2: Usuario = new Usuario();
          usuario2.Nombre = usuario.payload.doc.data().Nombre;
          usuario2.Email = usuario.payload.doc.data().Email;
          usuario2.DNI= usuario.payload.doc.data().DNI;
          usuario2.Especialidad= usuario.payload.doc.data().Especialidad;
          usuario2.Apellido = usuario.payload.doc.data().Apellido;
          usuario2.ImagenUno = usuario.payload.doc.data().ImagenUno;
          usuario2.Id = usuario.payload.doc.id;
          usuario2.Aprobado = usuario.payload.doc.data().Aprobado;
          usuario2.Lunes = usuario.payload.doc.data().Lunes;
          usuario2.Martes = usuario.payload.doc.data().Martes;
          usuario2.Miercoles = usuario.payload.doc.data().Miercoles;
          usuario2.Jueves = usuario.payload.doc.data().Jueves;
          usuario2.Viernes = usuario.payload.doc.data().Viernes;
          usuario2.Sabado = usuario.payload.doc.data().Sabado;
          usuario2.Desde = usuario.payload.doc.data().Desde;
          usuario2.Hasta = usuario.payload.doc.data().Hasta;
          usuario2.DesdeSabado= usuario.payload.doc.data().DesdeSabado;
          usuario2.HastaSabado = usuario.payload.doc.data().HastaSabado;
          // console.log(usuario2);
          this.listaEspecialistas.push(usuario2);
         }       
       })
     })
   ).subscribe((datos: any) => {
   });
  }

}
