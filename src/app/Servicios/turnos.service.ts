import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Turno } from '../Clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  public turnos;
  constructor(public router: Router, public firestore:AngularFirestore) {
    this.turnos = this.firestore.collection("turnos").snapshotChanges();
   }

   guardarTurno(turno:Turno) {
    this.firestore.collection('turnos').add({
      Id : turno.Id,
      Horario: turno.Horario,
      Especialidad: turno.Especialidad,
      EspecialistaEmail: turno.EspecialistaEmail,
      PacienteEmail: turno.PacienteEmail,
      Comentario: turno.Comentario,
      Estado: turno.Estado,
    });
  }
}
