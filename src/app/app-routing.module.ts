import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './Componentes/bienvenido/bienvenido.component';
import { ListaEspecialistasComponent } from './Componentes/lista-especialistas/lista-especialistas.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { VerificarEmailComponent } from './Componentes/verificar-email/verificar-email.component';
import { UsuariosModule } from './usuarios/usuarios.module';

const routes: Routes = [
  {path: '', redirectTo:'bienvenido',pathMatch:'full'},
  {path: 'bienvenido', component:BienvenidoComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'verificarEmail', component:VerificarEmailComponent},
  {path: 'Usuarios', loadChildren:()=>import('./usuarios/usuarios.module').then(m => UsuariosModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

