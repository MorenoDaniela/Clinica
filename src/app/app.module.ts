import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { BienvenidoComponent } from './Componentes/bienvenido/bienvenido.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerificarEmailComponent } from './Componentes/verificar-email/verificar-email.component';
import { NavComponent } from './Componentes/nav/nav.component';
import { AltaEspecialidadComponent } from './Componentes/alta-especialidad/alta-especialidad.component';
import { ListaEspecialidadComponent } from './Componentes/lista-especialidad/lista-especialidad.component';
import { ListaEspecialistasComponent } from './Componentes/lista-especialistas/lista-especialistas.component';
import { AltaUsuarioComponent } from './Componentes/alta-usuario/alta-usuario.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent,
    VerificarEmailComponent,
    NavComponent,
    AltaEspecialidadComponent,
    ListaEspecialidadComponent,
    ListaEspecialistasComponent,
    AltaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
