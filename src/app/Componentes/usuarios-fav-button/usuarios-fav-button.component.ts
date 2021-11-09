import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/Clases/usuario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { convertTypeAcquisitionFromJson } from 'typescript';

@Component({
  selector: 'app-usuarios-fav-button',
  templateUrl: './usuarios-fav-button.component.html',
  styleUrls: ['./usuarios-fav-button.component.css']
})
export class UsuariosFavButtonComponent implements OnInit {
  @Output() eventoUsuarioSelect : EventEmitter<Usuario> = new EventEmitter<Usuario>();
  open: boolean=false;
  listadoTurnos:any = [];
  listaTurnos:any = [];
  listadoUsuarios:any = [];
  listaUsuarios:any = [];
  
  constructor(public ingresarService: IngresarService) 
  { 
   
  }

  ngOnInit(): void {
    this.open=false;
    this.listadoUsuarios = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Paciente'));
    this.BuscarUsuarios();
    // this.abrirMenu();
  }

  BuscarUsuarios()
  {
    this.listadoUsuarios.snapshotChanges().pipe(
      map( (data: any) => {
        this.listaUsuarios = new Array<Usuario>();
        data.map((user: any) =>{
          var usuario: Usuario = new Usuario();
          usuario.Nombre = user.payload.doc.data().Nombre;
          usuario.ImagenUno = user.payload.doc.data().ImagenUno;
          usuario.Email = user.payload.doc.data().Email;
          console.log(user.payload.doc.data().Nombre);
          // nuevoTurno.EspecialistaEmail = turnito.payload.doc.data().EspecialistaEmail;
          // nuevoTurno.Estado = turnito.payload.doc.data().Estado;
          // nuevoTurno.PacienteEmail = turnito.payload.doc.data().PacienteEmail;
          // nuevoTurno.Id = turnito.payload.doc.id;
          this.listaUsuarios.push(usuario);     
          
                      
        })
      })
    ).subscribe();
    console.log(this.listaUsuarios);
  }

  abrirMenu()
  {
    
    var element = <HTMLElement><unknown>document.getElementById("menu");
    if (!this.open)
    {
      console.log(this.open+"en false")
      element.classList.remove("d-none");
      element.classList.add("d-block");
     
      this.open=true;
    }else{
      console.log(this.open+"en true")
      element.classList.remove("d-block");
      element.classList.add("d-none");

      this.open=false;
    }
  }

  emitirUser(user:Usuario)
  {
     this.eventoUsuarioSelect.emit(user);
  }
 

}
