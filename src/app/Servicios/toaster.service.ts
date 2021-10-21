import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  [x: string]: any;

  constructor(public toastr: ToastrService) { }

  showExito(message:any, title:any, timespan:any){
    this.toastr.success(message, title ,{
      timeOut :  timespan
    })
  }

  showError(message:any, title:any, timespan:any){
    this.toastr.error(message, title ,{
      timeOut :  timespan
    })
  }
}
