import { Directive, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appSetFocus]'
})
export class SetFocusDirective {

  @Input('appSetFocus') set isFocused(value: boolean) {
    if (value) {
      console.log('***SetFocusDirective***');
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }

  constructor(private hostElement: ElementRef, private renderer: Renderer) {}

}
