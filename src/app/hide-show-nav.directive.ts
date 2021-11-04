import { Directive, ElementRef } from '@angular/core';
import { IngresarService } from './Servicios/ingresar.service';

@Directive({
  selector: '[appHideShowNav]'
})
export class HideShowNavDirective {

  isAdmin:boolean=false;
  isLogued:boolean=false;
  constructor(el: ElementRef, public ingresarService: IngresarService) 
  { 
    let user = this.ingresarService.getItemLocal();
    console.log(user);
    if(user!=null )
    {
      
      el.nativeElement.style.display = 'none';
      if (user.TipoUsuario == "Administrador")
      {
        this.isAdmin = true;
        el.nativeElement.style.display = 'block';
        this.isLogued=true;
      }

    }else
    {
      this.isLogued=false;
    }
   
  }

}
