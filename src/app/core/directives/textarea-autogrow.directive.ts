import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appTextareaAutogrow]' })
export class TextareaAutogrowDirective {
  constructor(el: ElementRef) {
    el.nativeElement.addEventListener('keydown', (e) => {
      e.target.style.height = e.target.scrollHeight + 'px';
    });
  }
}
