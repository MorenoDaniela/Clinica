import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './Componentes/bienvenido/bienvenido.component';
import { IndexRegistroComponent } from './Componentes/index-registro/index-registro.component';
import { ListaEspecialidadComponent } from './Componentes/lista-especialidad/lista-especialidad.component';
import { ListaEspecialistasComponent } from './Componentes/lista-especialistas/lista-especialistas.component';
import { LoginComponent } from './Componentes/login/login.component';
import { MiPerfilComponent } from './Componentes/mi-perfil/mi-perfil.component';
import { RegistroPacienteComponent } from './Componentes/registro-paciente/registro-paciente.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { SolicitarTurnoComponent } from './Componentes/solicitar-turno/solicitar-turno.component';
import { VerificarEmailComponent } from './Componentes/verificar-email/verificar-email.component';
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
  {path:'solicitar-turno',component:SolicitarTurnoComponent},
  {path: 'Usuarios', loadChildren:()=>import('./usuarios/usuarios.module').then(m => UsuariosModule), canActivate:[PuedoVerGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

