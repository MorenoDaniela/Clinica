import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaHistoriaClinicaComponent } from './Componentes/alta-historia-clinica/alta-historia-clinica.component';
import { BienvenidoComponent } from './Componentes/bienvenido/bienvenido.component';
import { HistoriaClinicaEspecialistasComponent } from './Componentes/historia-clinica-especialistas/historia-clinica-especialistas.component';
import { IndexRegistroComponent } from './Componentes/index-registro/index-registro.component';
import { ListaEspecialidadComponent } from './Componentes/lista-especialidad/lista-especialidad.component';
import { ListaEspecialistasComponent } from './Componentes/lista-especialistas/lista-especialistas.component';
import { LoginComponent } from './Componentes/login/login.component';
import { MiPerfilComponent } from './Componentes/mi-perfil/mi-perfil.component';
import { MisTurnosAdministradorComponent } from './Componentes/mis-turnos-administrador/mis-turnos-administrador.component';
import { MisTurnosEspecialistaComponent } from './Componentes/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosPacienteComponent } from './Componentes/mis-turnos-paciente/mis-turnos-paciente.component';
import { RegistroPacienteComponent } from './Componentes/registro-paciente/registro-paciente.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { SolicitarTurnoComponent } from './Componentes/solicitar-turno/solicitar-turno.component';
import { VerificarEmailComponent } from './Componentes/verificar-email/verificar-email.component';
import { EspecialistasModule } from './especialistas/especialistas.module';
import { PuedoVerPacienteYAdminGuard } from './puedo-ver-paciente-yadmin.guard';
import { PuedoVerGuard } from './puedo-ver.guard';
import { UsuariosModule } from './usuarios/usuarios.module';

const routes: Routes = [
  {path: '', redirectTo:'bienvenido',pathMatch:'full'},
  {path: 'bienvenido', component:BienvenidoComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'registroPacientes', component:RegistroPacienteComponent},
  {path: 'verificarEmail', component:VerificarEmailComponent},
  {path: 'listaEspe', component:ListaEspecialidadComponent},
  {path: 'indexRegistro', component:IndexRegistroComponent},
  {path: 'miPerfil', component:MiPerfilComponent},
  {path:'solicitar-turno',component:SolicitarTurnoComponent, canActivate:[PuedoVerPacienteYAdminGuard]},
  {path: 'MisTurnosPaciente',component:MisTurnosPacienteComponent},
  {path: 'MisTurnosEspecialista',component:MisTurnosEspecialistaComponent},
  {path: 'MisTurnosAdministrador',component:MisTurnosAdministradorComponent,canActivate:[PuedoVerGuard]},
  {path: 'AltaHistoriaClinica/:turnito',component:AltaHistoriaClinicaComponent},
 {path: 'HistoriaClinicaEspecialista',component:HistoriaClinicaEspecialistasComponent},
  {path: 'Usuarios', loadChildren:()=>import('./usuarios/usuarios.module').then(m => UsuariosModule), canActivate:[PuedoVerGuard]},
  {path: 'Pacientes', loadChildren:()=>import('./especialistas/especialistas.module').then(m => EspecialistasModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

