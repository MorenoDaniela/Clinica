import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HistoriaClinica } from '../Clases/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  public historias;
  constructor(public router: Router, public firestore:AngularFirestore)
   {
    this.historias = this.firestore.collection("historiaClinica").snapshotChanges();
  }
  guardarHistoriaClinica(historia:HistoriaClinica) {
    this.firestore.collection('historiaClinica').add({
      Presion: historia.Presion,
      Altura: historia.Altura,
      Peso: historia.Peso,
      Clave1:historia.Clave1,
      Temperatura:historia.Temperatura,
      Valor1:historia.Valor1,
      Clave2:historia.Clave2,
      Valor2:historia.Valor2,
      Turno:historia.Turno,
      Id:""
    });
  }
}
