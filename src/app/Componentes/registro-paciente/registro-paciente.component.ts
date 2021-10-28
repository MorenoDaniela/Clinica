import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ToasterService } from 'src/app/Servicios/toaster.service';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  public listadoEspecialidades:any = [];
  public listaEspecialidades:any = [];
  formulario!: FormGroup;
  basePath = '/images';                       
  downloadableURL = '';  
  downloadableURL2 = '';                       
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;


  constructor(public routes: Router, public authService: IngresarService, public fb: FormBuilder, private fireStorage: AngularFireStorage, public toastr: ToasterService,public especialidades: EspecialidadesService)
   {

  }
//,{ validator: this.validar }
  ngOnInit(): void {
    this.buildForm();
    this.validar(this.formulario);
    // this.listadoEspecialidades = this.especialidades.firestore.collection("especialidades", ref => ref.orderBy('nombre'));
    // this.cargarEspecialidades();
  }

  buildForm() {
    this.formulario=this.fb.group({
      Nombre:["", Validators.required],
      Apellido:["", Validators.required],
      Edad:["", [Validators.required, Validators.min(1), Validators.max(100)]],
      // TipoUsuario:["",Validators.required],
      DNI:["", [Validators.required, Validators.min(6000000), Validators.max(70000000), this.validarDNI]],
      ObraSocial:["", Validators.required],
      // Especialidad:["",],
      Email:["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      Imagen1:["", Validators.required],
      Imagen2:["",Validators.required ],
      Contraseña:["", Validators.required],
      
    })
  }

   validar(formulario: FormGroup) {
    // let tipoUsuario = formulario.get('TipoUsuario')?.value;
    let ObraSocial = formulario.get('ObraSocial');
    let Foto2 = formulario.get('Imagen2');
    // let Especialidad = formulario.get("Especialidad");
  
    formulario.get('TipoUsuario')?.valueChanges
        .subscribe(TipoUsuario => {
  
          // if (TipoUsuario === 'Especialista') {
            
          //   Especialidad?.setValidators([Validators.required]);
          //   ObraSocial?.setValidators(null);
          //   Foto2?.setValidators(null);
          // }
  
          if (TipoUsuario === 'Paciente') {
            // Especialidad?.setValidators(null);
            ObraSocial?.setValidators([Validators.required]);
            Foto2?.setValidators([Validators.required]);
          }
  
          // Especialidad?.updateValueAndValidity();
          ObraSocial?.updateValueAndValidity();
          Foto2?.updateValueAndValidity();
        });
    
  }
  aceptar()
  {
  // console.log(this.formulario.get);
   const Nombre = this.formulario.controls['Nombre'].value;
   const Apellido = this.formulario.controls['Apellido'].value;
   const Edad = this.formulario.controls['Edad'].value;
  //  const TipoUsuario = this.formulario.controls['TipoUsuario'].value;
   const DNI = this.formulario.controls['DNI'].value;
   const ObraSocial = this.formulario.controls['ObraSocial'].value;
  //  const Especialidad = this.formulario.controls['Especialidad'].value;
   const Email = this.formulario.controls['Email'].value;
   const Contraseña = this.formulario.controls['Contraseña'].value;
   const Imagen1 = this.downloadableURL;
   const Imagen2 = this.downloadableURL2;
  //  if (TipoUsuario=="Especialista")
  //  {
  //   this.authService.registroWithEmailAndPassword(Email,Contraseña, Nombre, Apellido, Edad, DNI, "",Imagen1, "",TipoUsuario,Especialidad,false);
  //   this.toastr.showExito("Se registro el especialista correctamente","Tus datos fueron enviados con exito.",2000);
  //  }
   
    this.authService.registroWithEmailAndPassword(Email,Contraseña, Nombre, Apellido, Edad, DNI, ObraSocial,Imagen1, Imagen2,"Paciente","",true);
    this.toastr.showExito("Se registro el paciente correctamente","Tus datos fueron enviados con exito.",2000);
  
  
  }
  aRegistro()
  {
    this.routes.navigate(["registro"]);
  }

  async onFileChanged(event:any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task

      this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given
      (await this.task).ref.getDownloadURL().then(url => { this.downloadableURL = url; });  // <<< url is found here
    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }
  }

  async onFileChanged2(event:any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task

      this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given
      (await this.task).ref.getDownloadURL().then(url => { this.downloadableURL2 = url; });  // <<< url is found here
    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }
  }

  validarDNI(control: AbstractControl)
  {
    const DNI = control.value;
    const estaMal = parseInt(DNI);
    // console.log(estaMal);
    if (!estaMal)
    {
      return {estaMal:true};
    }
    return null;
  }

  cargarEspecialidades()
{
  this.listadoEspecialidades.snapshotChanges().pipe(
    map( (data: any) => {
      this.listaEspecialidades = new Array<string>();
      data.map((especialidad: any) =>{
        // console.log(especialidad);
        var especialidad2: string ;
        especialidad2 = especialidad.payload.doc.data().nombre;
      //  console.log(especialidad2);
        this.listaEspecialidades.push(especialidad2);
      })
    })
  ).subscribe((datos: any) => {
  });
 }
}



