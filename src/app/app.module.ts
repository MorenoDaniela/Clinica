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
import { HideShowNavDirective } from './hide-show-nav.directive';
import { IndexRegistroComponent } from './Componentes/index-registro/index-registro.component';
import { RegistroPacienteComponent } from './Componentes/registro-paciente/registro-paciente.component';
import { SolicitarTurnoComponent } from './Componentes/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './Componentes/mi-perfil/mi-perfil.component';
import { MisTurnosPacienteComponent } from './Componentes/mis-turnos-paciente/mis-turnos-paciente.component';
import { MisTurnosEspecialistaComponent } from './Componentes/mis-turnos-especialista/mis-turnos-especialista.component';
import { TurnosComponent } from './Componentes/turnos/turnos.component';
import { DetalleEspecialidadComponent } from './Componentes/detalle-especialidad/detalle-especialidad.component';
import { ButtonsEspecialistasComponent } from './Componentes/buttons-especialistas/buttons-especialistas.component';
import { DetalleEspecialistaComponent } from './Componentes/detalle-especialista/detalle-especialista.component';
import { DiaHoraComponent } from './Componentes/dia-hora/dia-hora.component';
import { DetalleDiaHoraComponent } from './Componentes/detalle-dia-hora/detalle-dia-hora.component';
import { FilterPipe } from './filter.pipe';
import { FilterEspecialistaPipe } from './filter-especialista.pipe';
import { MisTurnosAdministradorComponent } from './Componentes/mis-turnos-administrador/mis-turnos-administrador.component';

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
    AltaUsuarioComponent,
    HideShowNavDirective,
    IndexRegistroComponent,
    RegistroPacienteComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    MisTurnosPacienteComponent,
    MisTurnosEspecialistaComponent,
    TurnosComponent,
    DetalleEspecialidadComponent,
    ButtonsEspecialistasComponent,
    DetalleEspecialistaComponent,
    DiaHoraComponent,
    DetalleDiaHoraComponent,
    FilterPipe,
    FilterEspecialistaPipe,
    MisTurnosAdministradorComponent
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
