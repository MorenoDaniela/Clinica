import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-registro',
  templateUrl: './index-registro.component.html',
  styleUrls: ['./index-registro.component.css']
})
export class IndexRegistroComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

aPacientes()
{
  this.router.navigate(['registroPacientes']);
}

aEspecialistas()
{
  this.router.navigate(['registro']);
}
}
