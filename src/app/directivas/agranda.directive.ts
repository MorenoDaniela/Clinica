import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgranda]'
})
export class AgrandaDirective {
  constructor(public el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.agrandar('45px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.agrandar('');
  }

  private agrandar(height: string) {
    this.el.nativeElement.style.height = height;

  }
}
