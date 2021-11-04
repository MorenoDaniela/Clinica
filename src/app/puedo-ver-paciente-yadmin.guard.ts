import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresarService } from './Servicios/ingresar.service';

@Injectable({
  providedIn: 'root'
})
export class PuedoVerPacienteYAdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.ingresarService.getItemLocal();
      if(user!=null && (user?.TipoUsuario == "Administrador" || user?.TipoUsuario == "Paciente"))
        return true

      return false;
  }
  constructor(public ingresarService: IngresarService, public router: Router) {
    
  }
  
}
