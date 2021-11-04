import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  constructor(public routes: Router) { }

  ngOnInit(): void {
  }

  Login()
  {
    this.routes.navigate(["login"]);
  }

}
