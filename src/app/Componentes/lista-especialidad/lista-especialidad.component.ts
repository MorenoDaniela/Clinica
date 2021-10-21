import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-lista-especialidad',
  templateUrl: './lista-especialidad.component.html',
  styleUrls: ['./lista-especialidad.component.css']
})
export class ListaEspecialidadComponent implements OnInit {
  public listadoEspecialidades:any = [];
  public listaEspecialidades:any = [];
  constructor(public especialidades: EspecialidadesService) { }

  ngOnInit(): void {
    this.listadoEspecialidades = this.especialidades.firestore.collection("especialidades", ref => ref.orderBy('nombre'));
    this.cargarEspecialidades();
  }


  cargarEspecialidades()
{
  this.listadoEspecialidades.snapshotChanges().pipe(
    map( (data: any) => {
      this.listaEspecialidades = new Array<string>();
      data.map((especialidad: any) =>{
        console.log(especialidad);
        var especialidad2: string ;
        especialidad2 = especialidad.payload.doc.data().nombre;
       console.log(especialidad2);
        this.listaEspecialidades.push(especialidad2);
      })
    })
  ).subscribe((datos: any) => {
  });
 }
}
