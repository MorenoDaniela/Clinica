import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class BienvenidoComponent implements OnInit {
  public visible:boolean=true;
  constructor(public routes: Router) { }

  ngOnInit(): void {
  }

  Login()
  {
    this.routes.navigate(["login"]);
  }

}
