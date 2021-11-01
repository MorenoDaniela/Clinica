import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public especialidades;
  constructor(public router: Router, public firestore:AngularFirestore)
   {
    this.especialidades = this.firestore.collection("especialidades").snapshotChanges();
  }

  guardarEspecialidad(especialidad:string,img:string) {
    this.firestore.collection('especialidades').add({
      nombre : especialidad,
      imagen: img
    });
  }
  
}
