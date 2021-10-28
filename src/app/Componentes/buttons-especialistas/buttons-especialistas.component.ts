import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/Clases/usuario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-buttons-especialistas',
  templateUrl: './buttons-especialistas.component.html',
  styleUrls: ['./buttons-especialistas.component.css']
})
export class ButtonsEspecialistasComponent implements OnInit {
  @Output() eventoEspecialistaSeleccionado : EventEmitter<string> = new EventEmitter<string>();
  @Input()
  EspecialistaAMostrar: any = "";
  @Input()
  EspecialidadAMostrar: any = "";
  public listadoEspecialistas:any = [];
  public listaEspecialistas:any = [];
  constructor(public ingresarService: IngresarService) { 
    this.listadoEspecialistas = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Especialista'));
  }

ngOnChanges(changes: SimpleChanges): void {
    if (this.EspecialidadAMostrar!="")
    {
      console.log("adentro");
      this.buscarEspecialistas();
    }
  }
  
  ngOnInit(): void {
  }

  emitirEspecialista(especialista:any){
  console.log(especialista);
    this.eventoEspecialistaSeleccionado.emit(especialista);
 }

 buscarEspecialistas(){
  this.listaEspecialistas = new Array<Usuario>();
  // let especi = (<HTMLInputElement>document.getElementById('selectEspecialidad')).value;
  console.log(this.EspecialidadAMostrar);
   this.listadoEspecialistas.snapshotChanges().pipe(
     map( (data: any) => {
       
       data.map((usuario: any) =>{
         console.log(usuario.payload.doc.data().Especialidad.includes(this.EspecialidadAMostrar));
         if (usuario.payload.doc.data().Especialidad.includes(this.EspecialidadAMostrar))
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
}
