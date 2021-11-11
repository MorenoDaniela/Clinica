import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPosicion]'
})
export class PosicionDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.agrandar('50px');
  }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.agrandar('1');
  // }

  private agrandar(height: string) {
    this.el.nativeElement.style.margin = height;

  }
}
