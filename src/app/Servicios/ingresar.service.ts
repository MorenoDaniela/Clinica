import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
// import {sendSignInLinkToEmail} from '@angular/firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isAdmin } from '@firebase/util';
import * as firebase from 'firebase/compat';

import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { first, map, subscribeOn } from 'rxjs/operators';
import { Horario } from '../Clases/horario';
import { Usuario } from '../Clases/usuario';
import { NavComponent } from '../Componentes/nav/nav.component';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class IngresarService{

  public verificado!:boolean;
  public tipoUsuario!:string;
  public estaAprobado!:boolean;
  public Nombre!: string;
  public Apellido!: string;
  public Edad!: number;
  public DNI!: number;
  public ObraSocial!: string;
  public Email!: string;
  public Password!: string;
  public ImagenUno!: string; //una sola imagen para especialistas
  public ImagenDos!: string;
  public Especialidad!: string; //solo especialistas
  public Id!:string;
  private usuarios:string = '/usuarios';
  public Usuario: Usuario = new Usuario();
  public subscripcion:any;
  public especialistas;
  // public User : any;
  UsuariosRef: AngularFirestoreCollection<any>;

  constructor(
      public afAuth: AngularFireAuth,
      public router: Router, // Inject Firebase auth service
      public db:AngularFirestore,
      public toastr: ToasterService
  ) {
      this.UsuariosRef = db.collection(this.usuarios);
      this.especialistas = this.db.collection("especialistas").snapshotChanges();
  }

  //Auth with emailAndPassword
  loginWithEmailAndPassword(email:string,pass:string){   
      this.afAuth.signInWithEmailAndPassword(email,pass)
          .then((result)=>{          
              this.subscripcion= this.checkTipoUsuario(email, result);
                }).catch((res)=>{
                    console.log(res);
                    this.Usuario.EstaLogueado=false;
                    this.toastr.showError("No se pudo loguear", "Error", 3000)
                      this.router.navigate(['bienvenido']);
                  });          
  }        
     
 checkTipoUsuario(email:string, result:any)
 {
  return this.getUsuario(email).snapshotChanges().pipe( map( (data: any) => {              
    data.map((us: any) =>{ 
      this.tipoUsuario = us.payload.doc.data().TipoUsuario;
      this.estaAprobado = us.payload.doc.data().Aprobado;
      this.Nombre = us.payload.doc.data().Nombre;
      this.Apellido = us.payload.doc.data().Apellido;
      this.DNI = us.payload.doc.data().DNI;
      this.ImagenDos = us.payload.doc.data().ImagenDos;
      this.ImagenUno = us.payload.doc.data().ImagenUno;
      this.ObraSocial = us.payload.doc.data().ObraSocial;
      this.Especialidad = us.payload.doc.data().Especialidad;
      this.verificado = result.user?.emailVerified;
      this.Edad = us.payload.doc.data().Edad;
      // console.log("verificado: "+ this.verificado);
      if (this.tipoUsuario=="Administrador" || (this.verificado && this.tipoUsuario=="Paciente") || 
      (this.verificado && this.tipoUsuario=="Especialista" && this.estaAprobado==true))
      {
        NavComponent.updateUserStatus.next(true);  
        this.Usuario.Id = us.payload.doc.id;
        this.Usuario.Email = email;
        this.Usuario.TipoUsuario= this.tipoUsuario;
        this.Usuario.EstaLogueado=true;
        this.Usuario.Aprobado=this.estaAprobado;
        this.Usuario.DNI=this.DNI;
        this.Usuario.Edad=this.Edad;
        this.Usuario.Nombre=this.Nombre;
        this.Usuario.Apellido=this.Apellido;
        this.Usuario.ImagenDos=this.ImagenDos;
        this.Usuario.ImagenUno=this.ImagenUno;
        this.Usuario.ObraSocial=this.ObraSocial;
        this.Usuario.Especialidad=this.Especialidad;
        console.log(this.Usuario.Email);
        localStorage.setItem('usuarioApp',JSON.stringify(this.Usuario));
        // console.log('dsps de set',this.getItemLocal());                      
                       
        this.router.navigate(['bienvenido']);
        this.toastr.showExito("Logueo exitoso.","Te logueaste", 3000); 
      }
      else
      {     
        if(!this.verificado)
        {
          this.toastr.showError("No verifico email.","Error", 3000);
          this.router.navigate(['verificarEmail']);
          throw Error("No verifico email.");
          
        }else
        {
          if (this.tipoUsuario=="Especialista" && this.estaAprobado==false)
          {
            this.toastr.showError("Su cuenta a??n no fue aprobada por un administrador.","Error", 3000);
            throw Error("Su cuenta a??n no fue aprobada por un administrador.");         
          }         
        }          
      }
    })
  })
  ).subscribe(); 
 }

getUsuario(email:string):any
{
  return this.db.collection("usuarios", ref => ref.where('Email', '==', email));
}

getId(email:string):any{
  this.db.collection("usuarios", ref => ref.where('Email', '==', email)).snapshotChanges().pipe(
    map( (data: any) => {
      data.map((usuario: any) =>{
        console.log(usuario.payload.doc.id);
        return usuario.payload.doc.id;
      })
    })
  ).subscribe((datos: any) => {
  });
}
  registroWithEmailAndPassword(email:string,pass:string, Nombre: string, Apellido: string,Edad: number, DNI: number,
    ObraSocial: string, ImagenUno: string, ImagenDos: string, TipoUsuario: string,
    Especialidad: string,Aprobado:boolean){
      this.afAuth.createUserWithEmailAndPassword(email,pass)
      .then((result)=>{
        this.UsuariosRef.add(
          {Email:email,
            Nombre: Nombre,
            Apellido: Apellido,
            Edad: Edad,
            DNI: DNI,
            ObraSocial: ObraSocial,
            Password: pass,
            ImagenUno: ImagenUno, 
            ImagenDos: ImagenDos,
            TipoUsuario: TipoUsuario,
            Especialidad: Especialidad, 
            Id: result.user!.uid,
            Aprobado:Aprobado,
            // fechaLogueo:new Date().toLocaleString(), id:result.user!.uid
            });
          this.toastr.showExito("Cuenta creada Exitosamente.","Registro exitoso", 3000);
          this.SendVerificationMail();
          // this.router.navigate(['verificarEmail']);
          // this.loginWithEmailAndPassword(email,pass);    
      })
      .catch((res)=>{
        console.log(res);
        if (res.code == "auth/email-already-in-use"){
          this.Usuario.EstaLogueado=false;
          this.toastr.showError("Usuario ya registrado", "Error", 3000)
          this.router.navigate(['bienvenido']);
        }else{
          this.Usuario.EstaLogueado=false;
          this.toastr.showError("No se pudo crear su cuenta", "Error", 3000)
          this.router.navigate(['bienvenido']);
        }

      });

  }
  RegistroAdministrador(email:string,pass:string, Nombre: string, Apellido: string,Edad: number, DNI: number, ImagenUno: string, TipoUsuario: string,Aprobado:boolean){
      this.afAuth.createUserWithEmailAndPassword(email,pass)
      .then((result)=>{
        this.UsuariosRef.add(
          {Email:email,
            Nombre: Nombre,
            Apellido: Apellido,
            Edad: Edad,
            DNI: DNI,
            Password: pass,
            ImagenUno: ImagenUno, 
            TipoUsuario: TipoUsuario,
            Id: result.user!.uid,
            Aprobado:Aprobado,
            });
          this.toastr.showExito("Cuenta creada Exitosamente.","Registro exitoso", 3000);
          this.router.navigate(['verificarEmail']);         
      })
      .catch((res)=>{
        console.log(res);
        if (res.code == "auth/email-already-in-use"){
          this.Usuario.EstaLogueado=false;
          this.toastr.showError("Usuario ya registrado", "Error", 3000)
          this.router.navigate(['bienvenido']);
        }else{
          this.Usuario.EstaLogueado=false;
          this.toastr.showError("No se pudo crear su cuenta", "Error", 3000)
          this.router.navigate(['bienvenido']);
        }

      });

  }

  async SendVerificationMail() {
    return (await this.afAuth.currentUser)?.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verificarEmail']);
    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.subscripcion?.unsubscribe();
      this.Usuario= new Usuario();
      console.log(localStorage.getItem('usuarioApp'));
      localStorage.removeItem('usuarioApp');
      console.log(localStorage.getItem('usuarioApp'));
    this.router.navigate(['bienvenido']);
    });
  }


  getItemLocal()
  {
    var user = localStorage.getItem('usuarioApp');
    if (user!=null)
    {
      return JSON.parse(user);
    }else{
      return null;
    }    
  }

  UpdateEspecialista(id:string, update:boolean)
  {
    console.log(id +""+ update);
  this.db.collection("usuarios").doc(id).update({Aprobado: update})
  }

  UpdateMishorarios(id:string, mishorarios:Horario)
  {
    console.log(id +""+ mishorarios.Lunes);
  // this.db.collection("usuarios").doc(id).update({Mishorarios: mishorarios});

  this.db.collection('usuarios').doc(id).update(Object.assign({}, mishorarios));
  }
 
}
