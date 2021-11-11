import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-bajar-pdf',
  templateUrl: './bajar-pdf.component.html',
  styleUrls: ['./bajar-pdf.component.css']
})
export class BajarPdfComponent implements OnInit {
  public visible:boolean=true;
  public array:any = [];
  public newArray:any = [];
  @Input()
  especialistaAMostrar: Usuario = new Usuario;
  user!:any;
  constructor(public ingresarService: IngresarService) { }

  ngOnInit(): void {
    // this.user = this.ingresarService.getItemLocal();
    // if (this.especialistaAMostrar!=undefined)
    // {
    //   this.buscarEspe().then(something => {
    //     console.log(something+"some")
    //   this.descargarPdf(this.newArray);
        
    // });  
    // }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.user = this.ingresarService.getItemLocal();
    if (this.especialistaAMostrar!=undefined)
    {
      const something = await this.buscarEspe();
      setTimeout(() => this.descargarPdf(something), 1000);
    } 
     
   }

  async buscarEspe()
  {
    this.array = this.ingresarService.db.collection('turnos', ref => ref.where('EspecialistaEmail','==',this.especialistaAMostrar.Email));
    this.newArray = new Array<Turno>();
    this.array.snapshotChanges().pipe(
      map( (data: any) => {        
        data.map((turno: any) =>{
          if (this.user.Email == turno.payload.doc.data().PacienteEmail && turno.payload.doc.data().Estado =='Finalizado')
          {
            var turn: Turno = new Turno();
            //  console.log(historia.payload.doc.data().Turno.PacienteEmail);
            console.log(turno.payload.doc.data().Horario);
             turn.Comentario = turno.payload.doc.data().Comentario;
             turn.Especialidad = turno.payload.doc.data().Especialidad;
             turn.EspecialistaEmail= turno.payload.doc.data().EspecialistaEmail;
             turn.Horario= turno.payload.doc.data().Horario;
             turn.PacienteEmail = turno.payload.doc.data().PacienteEmail;
             turn.Estado = turno.payload.doc.data().Estado;
             this.newArray.push(turn);      
          }        
        })
      })
    ).subscribe((datos: any) => {
    });

    return this.newArray;

   
  }

descargarPdf(anotherone:any)
{
  let doc = new jsPDF();
      let col = [["Comentario", "Especialidad", "Email Especialista","Horario","Paciente"]];
      let rows:any[] = [];

      anotherone.forEach((element: any) => { 
      let temp = [element.Comentario ,element.Especialidad ,element.EspecialistaEmail ,element.Horario ,element.PacienteEmail];
      rows.push(temp);
  });        
      autoTable(doc, {
              head: col,
              body: rows,
              didDrawCell: (rows) => {
               },
          });

      doc.save('turnos.pdf');
}
}
