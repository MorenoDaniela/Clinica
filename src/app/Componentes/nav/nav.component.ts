import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { Subject } from 'rxjs/internal/Subject';
import { Usuario } from 'src/app/Clases/usuario';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // usuario:Usuario = new Usuario();
  isLogued!:boolean;
  public static updateUserStatus: Subject<boolean> = new Subject();
  isAdmin:boolean=false;
  isEspecialista:boolean=false;
  isPaciente:boolean=false;
  constructor(public routes: Router, public ingresarService:IngresarService)
   {
    NavComponent.updateUserStatus.subscribe(res => {
      this.cambiar();
    })
  }

  ngOnInit(): void {
    console.log("oninit");
   this.cambiar()
  }

  cambiar()
  {
    let usuario = this.ingresarService.getItemLocal();
    console.log(usuario);
    if(usuario!=null)
    {
      if(usuario.TipoUsuario == "Administrador") {
        this.isAdmin = true;
        this.isPaciente=false;
        this.isEspecialista=false;
        this.isLogued=true;
        console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
      }

      if(usuario.TipoUsuario=="Especialista")
        {
          this.isEspecialista=true;
          this.isPaciente=false;
          this.isAdmin=false;
          this.isLogued=true;
          console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
        }

      if(usuario.TipoUsuario=="Paciente")
      {
        this.isPaciente=true;
        this.isEspecialista=false;
        this.isAdmin=false;
        this.isLogued=true;
        console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
      }

    }else
    {
      this.isLogued=false;
      this.isPaciente=false;
      this.isEspecialista=false;
      this.isAdmin=false;
      console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cambiar();
    // if(user!=null)
    // {     
    //   if(user.TipoUsuario == "Administrador") {
    //     this.isAdmin = true;
    //     this.isPaciente=false;
    //     this.isEspecialista=false;
    //     this.isLogued=true;
    //     console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
    //   }

    //   if(user.TipoUsuario=="Especialista")
    //     {
    //       this.isEspecialista=true;
    //       this.isPaciente=false;
    //       this.isAdmin=false;
    //       this.isLogued=true;
    //       console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
    //     }

    //   if(user.TipoUsuario=="Paciente")
    //   {
    //     this.isPaciente=true;
    //     this.isEspecialista=false;
    //     this.isAdmin=false;
    //     this.isLogued=true;
    //     console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
    //   }

    // }else
    // {
    //   this.isLogued=false;
    //   this.isPaciente=false;
    //   this.isEspecialista=false;
    //   this.isAdmin=false;
    //   console.log("admin:"+this.isAdmin +" paciente: " + this.isPaciente +" especialista:"+ this.isEspecialista +"logueado:"+ this.isLogued);
    // }
  }

  RegistroPyE()
  {
    this.routes.navigate(["indexRegistro"]);
  }
  Login()
  {
    this.routes.navigate(["login"]);
  }
  MiPerfil()
  {
    this.routes.navigate(["miPerfil"]);
  }
  AltaUsuario()
  {
    this.routes.navigate(["Usuarios/altaUsuario"]);
  }
  ListaEspecialistas()
  {
    this.routes.navigate(["Usuarios/Especialistas"]);
  }

  SolicitarTurno()
  {
    this.routes.navigate(['solicitar-turno']);
  }

  MisTurnosPaciente()
  {
    this.routes.navigate(['MisTurnosPaciente']);
  }
  MisTurnosEspecialista()
  {
    this.routes.navigate(['MisTurnosEspecialista']);
  }
  MisTurnosAdministrador()
  {
    this.routes.navigate(['MisTurnosAdministrador']);
  }
  // HistoriaClinicaPaciente()
  // {
  //   this.routes.navigate(['MisTurnosPaciente']);
  // }
  HistoriaClinicaEspecialista()
  {
    this.routes.navigate(['Pacientes/HistoriaClinicaEspecialista']);
  }
  HistoriaClinicaAdministrador()
  {
    this.routes.navigate(['Usuarios/HistoriaClinicaAdministrador']);
  }
  Salir()
  {
    this.isLogued=false;
    this.ingresarService.logout();
  }
}
