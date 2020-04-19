import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'ngx-option',
  template: `
    <div class="option">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ngx-option.component.css']
})
export class NgxOptionComponent implements OnInit {
  @Input() value: string;
  @Input() parent: boolean;
  click$: Observable<string>;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  get element() {
    return this.host.nativeElement;
  }
}
