import { Component, OnInit } from '@angular/core';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/Clases/usuario';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent implements OnInit {

  public listadoEspecialistas:any = [];
  public listaEspecialistas:any = [];
  constructor(public ingresarService: IngresarService) { }

  ngOnInit(): void {
    this.listadoEspecialistas = this.ingresarService.db.collection("usuarios", ref => ref.where('TipoUsuario', '==', 'Especialista'));
    this.cargarEspecialidades();
  }


  cargarEspecialidades()
  {
    this.listadoEspecialistas.snapshotChanges().pipe(
      map( (data: any) => {
        this.listaEspecialistas = new Array<Usuario>();
        data.map((usuario: any) =>{
          console.log(usuario.payload);
          var usuario2: Usuario = new Usuario();
          usuario2.Nombre = usuario.payload.doc.data().Nombre;
          usuario2.Email = usuario.payload.doc.data().Email;
          usuario2.DNI= usuario.payload.doc.data().DNI;
          usuario2.Especialidad= usuario.payload.doc.data().Especialidad;
          usuario2.Apellido = usuario.payload.doc.data().Apellido;
          usuario2.Id = usuario.payload.doc.id;
          usuario2.Aprobado = usuario.payload.doc.data().Aprobado;
          console.log(usuario2);
          this.listaEspecialistas.push(usuario2);
        })
      })
    ).subscribe((datos: any) => {
    });
   }

   UpdateEstado(id:string,update:boolean)
   {
    this.ingresarService.UpdateEspecialista(id, update);
   }

}
