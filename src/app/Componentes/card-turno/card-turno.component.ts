import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Usuario } from 'src/app/Clases/usuario';
import { HistoriaClinicaService } from 'src/app/Servicios/historia-clinica.service';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { query, where, collection, doc, setDoc, getDocs } from "firebase/firestore";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.css']
})
export class CardTurnoComponent implements OnInit {
  @Output() eventoHistoriaSeleccionada : EventEmitter<HistoriaClinica> = new EventEmitter<HistoriaClinica>();
  USER:Usuario = new Usuario;
  @Input()
  usuarioAMostrar: Usuario = new Usuario;
  public listadoHistoriaClinica:any = [];
  public listaHistoriaClinica:any = [];
  public listaDefinitiva:any = [];
  // historiasRef : AngularFirestoreCollection<any>= new AngularFirestoreCollection<any>();
  constructor(public ingresarService: IngresarService,public historiaClinicaService: HistoriaClinicaService, public db:AngularFirestore)
   {
    
    }

  ngOnInit(): void {
    // this.obtenerUser();  
    // this.listadoHistoriaClinica = this.historiaClinicaService.firestore.collection("historiaClinica", ref => ref.where('Turno.EspecialistaEmail', '==', this.USER.Email)); 
    // this.buscarHistoria();
  }


  async ngOnChanges(changes: SimpleChanges):Promise<void> {
    this.obtenerUser();
    if (this.usuarioAMostrar.Nombre!=undefined)
    {
    
    this.listadoHistoriaClinica = this.historiaClinicaService.firestore.collection("historiaClinica", ref => ref.where('Turno.EspecialistaEmail', '==', this.USER.Email));
    
    this.listaDefinitiva =await this.buscarHistoria();
    }
  }

  obtenerUser()
  {
    this.USER = this.ingresarService.getItemLocal();
    console.log(this.USER);
  }

 

  async buscarHistoria(){
    if (this.usuarioAMostrar.Nombre!=undefined)
    {
      console.log(this.usuarioAMostrar.Nombre+"el nombre");
      this.listaHistoriaClinica = new Array<HistoriaClinica>();
     this.listadoHistoriaClinica.snapshotChanges().pipe(
       map( (data: any) => {        
         data.map((historia: any) =>{
           if (historia.payload.doc.data().Turno.PacienteEmail == this.usuarioAMostrar.Email){
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
           }
               
         })
       })
     ).subscribe((datos: any) => {
     });
    }
    return this.listaHistoriaClinica;
  }


  emitirHistoria(historia:HistoriaClinica)
  {
     this.eventoHistoriaSeleccionada.emit(historia);
  }

 
}
