import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuarioComponent } from '../Componentes/alta-usuario/alta-usuario.component';
import { HistoriaClinicaAdministradoresComponent } from '../Componentes/historia-clinica-administradores/historia-clinica-administradores.component';
import { ListaEspecialistasComponent } from '../Componentes/lista-especialistas/lista-especialistas.component';

const routes: Routes = [
  {path:"altaUsuario",component:AltaUsuarioComponent},
  {path: "Especialistas", component:ListaEspecialistasComponent},
  {path: "HistoriaClinicaAdministrador", component:HistoriaClinicaAdministradoresComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
