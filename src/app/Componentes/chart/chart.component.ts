
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/Clases/turno';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
// import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public listadoTurnos:any = [];
  public listaTurnos:any = [];
  public especialidades:any =[];
  constructor(public turnosService: TurnosService, public ingresarService: IngresarService, public toaster:ToasterService) { }

  ngOnInit(): void {
    this.listadoTurnos = this.turnosService.firestore.collection("turnos", ref => ref.orderBy("Horario"));
    this.CargarTodosTurnos();

    setTimeout(() => this.contarTurnos(this.especialidades), 2000);
    setTimeout(() => this.crearGrafico(), 2000);
  }

  CargarTodosTurnos()
  {      
    console.log("hola");
    this.listadoTurnos.snapshotChanges().pipe(
      map( (data: any) => {
        this.listaTurnos = new Array<Turno>();
        data.map((turnito: any) =>{
          var nuevoTurno: Turno = new Turno();
          
          nuevoTurno.Horario = turnito.payload.doc.data().Horario;
          nuevoTurno.Comentario = turnito.payload.doc.data().Comentario;
          nuevoTurno.Especialidad = turnito.payload.doc.data().Especialidad;
          nuevoTurno.EspecialistaEmail = turnito.payload.doc.data().EspecialistaEmail;
          nuevoTurno.Estado = turnito.payload.doc.data().Estado;
          nuevoTurno.PacienteEmail = turnito.payload.doc.data().PacienteEmail;
          nuevoTurno.Id = turnito.payload.doc.id;
          this.listaTurnos.push(nuevoTurno);     
          this.especialidades.push(turnito.payload.doc.data().Especialidad);
                      
        })
      })
    ).subscribe();
    console.log(this.listaTurnos);
  }
  

  contarTurnos(algo:any){
    var count = algo.length;
    console.log(count +"count");
  }

  crearGrafico(){
    var cantidadGeneral = this.especialidades.length;
    const occurrences = this.especialidades.reduce(function (acc:any, curr:any) {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    
    console.log(occurrences) // => {2: 5, 4: 1, 5: 3, 9: 1}

  }
}
