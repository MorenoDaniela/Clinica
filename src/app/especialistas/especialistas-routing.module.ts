import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaEspecialistasComponent } from '../Componentes/historia-clinica-especialistas/historia-clinica-especialistas.component';

const routes: Routes = [
  {path:"HistoriaClinicaEspecialista",component:HistoriaClinicaEspecialistasComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistasRoutingModule { }
