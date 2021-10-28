import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MisHorariosService {

  public horarios;
  constructor(public router: Router, public firestore:AngularFirestore)
   {
    this.horarios = this.firestore.collection("horarios").snapshotChanges();
  }

  guardarMisHorarios(Dias:Array<any>,Desde:number,Hasta:number,DesdeSabado:number,HastaSabado:number,user:any) {
    this.firestore.collection('horarios').add({
      Dias : Dias,
      Desde:Desde,
      Hasta:Hasta,
      DesdeSabado:DesdeSabado,
      HastaSabado:HastaSabado,
      user:user
    });
  }
}
