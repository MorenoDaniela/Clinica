import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/Clases/usuario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";
  usuarios:Array <Usuario> = new Array<Usuario>();
  arrayUsuarios:Array <Usuario> = new Array<Usuario>();
  constructor(public routes: Router, public ingresarService : IngresarService) { }

  ngOnInit(): void {
    this.arrayUsuarios = this.cargarUsuarios();
  }

  Loguear()
  {
    console.log(this.email + this.password);
    this.ingresarService.loginWithEmailAndPassword(this.email,this.password);
  }
  aRegistro()
  {
    this.routes.navigate(["indexRegistro"]);
  }


  cargarUsuarios()
  {
    this.arrayUsuarios = [];
    console.log(this.arrayUsuarios+"empieza");
    this.ingresarService.db.collection("usuarios", ref => ref.orderBy('TipoUsuario')).snapshotChanges().pipe( map( (data: any) => {              
      data.map((us: any) =>
      { 
        const user = new Usuario();
        user.Email = us.payload.doc.data().Email;
        console.log(user.Email);
        user.Password = us.payload.doc.data().Password;
        user.ImagenUno = us.payload.doc.data().ImagenUno;
        user.Nombre = us.payload.doc.data().Nombre;
        user.TipoUsuario = us.payload.doc.data().TipoUsuario;
        this.usuarios.push(user);
      });
    })).subscribe((datos: any) => {
    });
    console.log(this.arrayUsuarios+"termina");
    return this.usuarios;
   
  }

  logUser(mail:string,pass:string){
    this.email=mail;
    this.password=pass;
    // this.ingresarService.loginWithEmailAndPassword(this.email,this.password);
  }
}
