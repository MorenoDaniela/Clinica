import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Usuario } from 'src/app/Clases/usuario';
import { HistoriaClinicaService } from 'src/app/Servicios/historia-clinica.service';
import { IngresarService } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-historia-clinica-especialistas',
  templateUrl: './historia-clinica-especialistas.component.html',
  styleUrls: ['./historia-clinica-especialistas.component.css']
})
export class HistoriaClinicaEspecialistasComponent implements OnInit {
  public mostrar:boolean=false;
  public historiaSeleccionada: HistoriaClinica = new HistoriaClinica;
  public usuarioSeleccionado: Usuario = new Usuario;
  public listadoHistoriaClinica:any = [];
  public listaHistoriaClinica:any = [];
  user!:any;
  constructor(public historiaClinicaService: HistoriaClinicaService, public ingresarService: IngresarService) {
    this.user = this.ingresarService.getItemLocal();
    this.listadoHistoriaClinica = this.historiaClinicaService.firestore.collection("historiaClinica", ref => ref.where('Turno.EspecialistaEmail', '==', this.user.Email));
    this.buscarHistoria();
    console.log(this.listaHistoriaClinica);
   }

  ngOnInit(): void {
  }
  buscarHistoria(){
    this.listaHistoriaClinica = new Array<HistoriaClinica>();
     this.listadoHistoriaClinica.snapshotChanges().pipe(
       map( (data: any) => {        
         data.map((historia: any) =>{
          var history: HistoriaClinica = new HistoriaClinica();
          console.log(historia.payload.doc.data().Turno.PacienteEmail);
          history.Temperatura = historia.payload.doc.data().Temperatura;
          history.Presion = historia.payload.doc.data().Presion;
          history.Altura= historia.payload.doc.data().Altura;
          history.Peso= historia.payload.doc.data().Peso;
          history.Clave1 = historia.payload.doc.data().Clave1;
          history.Clave2 = historia.payload.doc.data().Clave2;
          history.Id = historia.payload.doc.id;
          history.Valor1 = historia.payload.doc.data().Valor1;
          history.Valor2 = historia.payload.doc.data().Valor2;
          history.Turno = historia.payload.doc.data().Turno;
            this.listaHistoriaClinica.push(history);      
         })
       })
     ).subscribe((datos: any) => {
     });
    }

    pasoUsuarioADetalle(event:any)
  {
    this.usuarioSeleccionado=event;
  }

  pasoHistoriaADetalle(event:any)
  {
    this.historiaSeleccionada=event;
    this.mostrar=true;
  }

  ocultar()
  {
    this.mostrar=false;
  }

}
