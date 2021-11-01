import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { map } from 'rxjs/operators';
import { ControlValueAccessor, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Especialidad } from 'src/app/Clases/especialidad';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { Usuario } from 'src/app/Clases/usuario';
@Component({
  selector: 'app-lista-especialidad',
  templateUrl: './lista-especialidad.component.html',
  styleUrls: ['./lista-especialidad.component.css']
})
//, ControlValueAccessor
export class ListaEspecialidadComponent implements OnInit {
  @Output() eventoEspecialidadSeleccionada : EventEmitter<Especialidad> = new EventEmitter<Especialidad>();
  @Input()
  EspecialistaAMostrar: Usuario= new Usuario;
  // @Input() public formulario!: FormGroup ;
  public listadoEspecialidades:any = [];
  public listaEspecialidades:any = [];
  public EspecialidadSeleccionada:any;
  public touched:boolean = false;
  
  constructor(public especialidades: EspecialidadesService, public ingresarService: IngresarService,private rootFormGroup: FormGroupDirective) {
    if (this.EspecialistaAMostrar!=null)
    {
      this.listadoEspecialidades =this.ingresarService.db.collection("especialidades", ref => ref.orderBy('nombre'));
      this.cargarEspecialidades();
    }
   }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.EspecialistaAMostrar!=null)
    {
      this.listadoEspecialidades =this.ingresarService.db.collection("especialidades", ref => ref.orderBy('nombre'));
      this.cargarEspecialidades();
    }
  }
  ngOnInit(): void {
    // this.form = this.rootFormGroup.control;
   
  }
 

      cargarEspecialidades()
    {
      
      this.listadoEspecialidades.snapshotChanges().pipe(
        map( (data: any) => {
          this.listaEspecialidades = new Array<Especialidad>();
          data.map((especialidad: any) =>{
              if (this.EspecialistaAMostrar.Especialidad!=undefined)
              {
                if (this.EspecialistaAMostrar?.Especialidad?.includes(especialidad.payload.doc.data().nombre)){
                  var especialidad2: Especialidad = new Especialidad();
                  especialidad2.nombre = especialidad.payload.doc.data().nombre;
                  especialidad2.imagen = especialidad.payload.doc.data().imagen;
                  this.listaEspecialidades.push(especialidad2);
                }
              }
                      
          })
        })
      ).subscribe((datos: any) => {
      });
    }
  emitirEspecialidad(especialidad:Especialidad)
  {
    console.log(especialidad);
      this.eventoEspecialidadSeleccionada.emit(especialidad);
  }

}
