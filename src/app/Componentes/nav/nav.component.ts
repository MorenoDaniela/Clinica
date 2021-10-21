import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { Subject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogued!:boolean;
  public static updateUserStatus: Subject<boolean> = new Subject();
  isAdmin:boolean=false;
  constructor(public routes: Router, public ingresarService:IngresarService)
   {
    NavComponent.updateUserStatus.subscribe(res => {
      this.isLogued = true})
  }

  ngOnInit(): void {
    let user = this.ingresarService.getItemLocal();
    console.log(user);
    if(user!=null)
    {
      this.isLogued=true;
      if(user.TipoUsuario == "Administrador")
      {
        this.isAdmin = true;
      }
    }else
    {
      this.isLogued=false;
    }
    
  }

  RegistroPyE()
  {
    this.routes.navigate(["registro"]);
  }
  Login()
  {
    this.routes.navigate(["login"]);
  }
  AltaUsuario()
  {
    this.routes.navigate(["Usuarios/altaUsuario"]);
  }
  ListaEspecialistas()
  {
    this.routes.navigate(["Usuarios/Especialistas"]);
  }
  Salir()
  {
    this.isLogued=false;
    this.ingresarService.logout();
  }
}
