import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresarService } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";
  constructor(public routes: Router, public ingresarService : IngresarService) { }

  ngOnInit(): void {
  }

  Loguear()
  {
    console.log(this.email + this.password);
    this.ingresarService.loginWithEmailAndPassword(this.email,this.password);
  }
  aRegistro()
  {
    this.routes.navigate(["registro"]);
  }

  admin()
  {
    this.email="denu.moreno.1990@gmail.com";
    this.password="123456";
  }
  paciente()
  {
    this.email="nick.rivers@hotmail.com";
    this.password="123456";
  }
  especialista()
  {
    this.email="denu.av@hotmail.com";
    this.password="123456";
  }
}
