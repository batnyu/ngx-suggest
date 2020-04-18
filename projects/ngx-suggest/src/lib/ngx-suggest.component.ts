import {
  Component,
  OnInit,
  ViewChild,
  ContentChild,
  ContentChildren,
  QueryList
} from '@angular/core';
import { NgxSuggestContentDirective } from './ngx-suggest-content.directive';
import { NgxOptionComponent } from './ngx-option.component';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'ngx-suggest',
  template: `
    <ng-template #root>
      <div class="suggest">
        <ng-container *ngTemplateOutlet="content.tpl"></ng-container>
      </div>
    </ng-template>
  `,
  exportAs: 'ngxSuggest',
  styleUrls: ['./ngx-suggest.component.css']
})
export class NgxSuggestComponent {
  @ViewChild('root') rootTemplate;

  @ContentChild(NgxSuggestContentDirective) content: NgxSuggestContentDirective;

  @ContentChildren(NgxOptionComponent) options: QueryList<NgxOptionComponent>;

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(
          (option: NgxOptionComponent) => option.click$
        );
        return merge(...clicks$);
      })
    );
  }
}
