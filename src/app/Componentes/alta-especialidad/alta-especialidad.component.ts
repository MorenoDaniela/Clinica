import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent implements OnInit {

  especialidad!:string;
  basePath = '/images';                       
  downloadableURL = '';                      
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;
  constructor(public especialidades: EspecialidadesService,private fireStorage: AngularFireStorage,) { }

  ngOnInit(): void {
  }

  guardarEspecialidad()
  {
    this.especialidades.guardarEspecialidad(this.especialidad, this.downloadableURL);
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

}
