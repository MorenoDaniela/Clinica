import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresarService } from 'src/app/Servicios/ingresar.service';
import { ToasterService } from 'src/app/Servicios/toaster.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  formulario!: FormGroup;
  basePath = '/images';                       
  downloadableURL = '';                      
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;
  
  constructor(public routes: Router, public authService: IngresarService, public fb: FormBuilder, private fireStorage: AngularFireStorage, public toastr: ToasterService)
  { 

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formulario=this.fb.group({
      Nombre:["", Validators.required],
      Apellido:["", Validators.required],
      Edad:["", [Validators.required, Validators.min(1), Validators.max(100)]],
      TipoUsuario:["",Validators.required],
      DNI:["", [Validators.required, Validators.min(6000000), Validators.max(70000000), this.validarDNI]],
      Email:["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      Imagen1:["", Validators.required],
      Contraseña:["", Validators.required],
      
    })
  }
  aceptar()
  {
  console.log(this.formulario.get);
   const Nombre = this.formulario.controls['Nombre'].value;
   const Apellido = this.formulario.controls['Apellido'].value;
   const Edad = this.formulario.controls['Edad'].value;
   const TipoUsuario = this.formulario.controls['TipoUsuario'].value;
   const DNI = this.formulario.controls['DNI'].value;
   const Email = this.formulario.controls['Email'].value;
   const Contraseña = this.formulario.controls['Contraseña'].value;
   const Imagen1 = this.downloadableURL;

    this.authService.RegistroAdministrador(Email,Contraseña, Nombre, Apellido, Edad, DNI,Imagen1,TipoUsuario,true);
    this.toastr.showExito("Se registro el administrador correctamente","Tus datos fueron enviados con exito.",2000);
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

}
