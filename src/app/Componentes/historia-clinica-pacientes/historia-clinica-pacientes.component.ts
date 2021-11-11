import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Turno } from 'src/app/Clases/turno';
import { HistoriaClinicaService } from 'src/app/Servicios/historia-clinica.service';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-historia-clinica-pacientes',
  templateUrl: './historia-clinica-pacientes.component.html',
  styleUrls: ['./historia-clinica-pacientes.component.css']
})
export class HistoriaClinicaPacientesComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  head = [['Fecha', 'Especialidad', 'Especialista', 'Reseña']]
  public listadoHistoriaClinica:any = [];
  public listaHistoriaClinica:any = [];
  user!:any;
  constructor(public historiaClinicaService: HistoriaClinicaService, public ingresarService: IngresarService) {
    this.user = this.ingresarService.getItemLocal();
    this.listadoHistoriaClinica = this.historiaClinicaService.firestore.collection("historiaClinica", ref => ref.where('Turno.PacienteEmail', '==', this.user.Email));
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

  crearPdf()
  {
    // const doc = new jsPDF();

    // const pdfTable = this.pdfTable.nativeElement;
    // doc.setFontSize(18);
    // doc.text('Turnos', 11, 8);
    // doc.setFontSize(11);
    // doc.setTextColor(100);
    // // doc.setCharSpace(1);
    // doc.setCreationDate(new Date());
    // doc.setFont('italic','2');

    // doc.html(pdfTable.innerHTML, {
    //   callback(rst) {
    //     rst.save('one.pdf');
    //   },
    //   x: 0.1,
    //   y: 0.1
    // });
    let DATA = <HTMLElement>document.getElementById('pdfTable');
    
    html2canvas(DATA).then(canvas => {
    
    let fileWidth = 208;
    let fileHeight = canvas.height * fileWidth / canvas.width;
    
    const FILEURI = canvas.toDataURL('image/png')
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
    
    PDF.save('angular-demo.pdf');
});     
  }
    
}
