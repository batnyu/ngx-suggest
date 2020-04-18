import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxSuggestContent]'
})
export class NgxSuggestContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
