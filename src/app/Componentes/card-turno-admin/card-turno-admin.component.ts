import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { HistoriaClinicaService } from 'src/app/Servicios/historia-clinica.service';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-card-turno-admin',
  templateUrl: './card-turno-admin.component.html',
  styleUrls: ['./card-turno-admin.component.css']
 
})
export class CardTurnoAdminComponent implements OnInit {
 
  fileName= 'ExcelSheet.xlsx'; 
  @Input() usuarioAMostrar: Usuario = new Usuario;
  public listadoTurno:any = [];
  public listaTurno:any = [];
  public listaDefinitiva:any = [];
  public mostrar:boolean=false;
  constructor(public ingresarService: IngresarService,public historiaClinicaService: HistoriaClinicaService, public db:AngularFirestore, public turnosService: TurnosService) { }

  ngOnInit(): void {
  }


  async ngOnChanges(changes: SimpleChanges):Promise<void> {
   
    if (this.usuarioAMostrar.Nombre!=undefined)
    {
    this.mostrar=true;
    this.listadoTurno = this.historiaClinicaService.firestore.collection("turnos", ref => ref.where('PacienteEmail','==',this.usuarioAMostrar.Email));
    
    this.listaDefinitiva =await this.buscarHistoria();
    }
  }

  async buscarHistoria(){
    if (this.usuarioAMostrar.Nombre!=undefined)
    {
      console.log(this.usuarioAMostrar.Nombre+"el nombre");
      this.listaTurno = new Array<Turno>();
     this.listadoTurno.snapshotChanges().pipe(
       map( (data: any) => {        
         data.map((turno: any) =>{
          var turn: Turno = new Turno();
          if(turno.payload.doc.data().Estado == 'Finalizado')
          {
            turn.Comentario = turno.payload.doc.data().Comentario;
          turn.Especialidad = turno.payload.doc.data().Especialidad;
          turn.EspecialistaEmail= turno.payload.doc.data().EspecialistaEmail;
          turn.Horario= turno.payload.doc.data().Horario;
          turn.Estado= turno.payload.doc.data().Estado;
          this.listaTurno.push(turn); 
          }
          // turn.Clave1 = turno.payload.doc.data().Clave1;
          // turn.Clave2 = turno.payload.doc.data().Clave2;
          // turn.Id = turno.payload.doc.id;
          // turn.Valor1 = turno.payload.doc.data().Valor1;
          // turn.Valor2 = turno.payload.doc.data().Valor2;
          // turn.Turno = turno.payload.doc.data().Turno;
          
               
         })
       })
     ).subscribe((datos: any) => {
     });
    }
    return this.listaTurno;
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
