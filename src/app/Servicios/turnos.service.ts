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
    this.turnos = this.firestore.collection("turnos").snapshotChanges().subscribe();
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

  UpdateEstadoTurnoYComentario(id:string, update:string, comentario:string)
  {
    console.log(id +""+ update);
    this.firestore.collection("turnos").doc(id).update({Estado:update, Comentario:comentario});
  }
  UpdateEstadoTurno(id:string, update:string)
  {
    console.log(id +""+ update);
    this.firestore.collection("turnos").doc(id).update({Estado:update});
  }
}
