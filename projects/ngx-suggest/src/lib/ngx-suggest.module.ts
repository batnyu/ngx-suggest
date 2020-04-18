import { NgModule } from '@angular/core';
import { NgxSuggestComponent } from './ngx-suggest.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSuggestContentDirective } from './ngx-suggest-content.directive';
import { NgxOptionComponent } from './ngx-option.component';
import { NgxSuggestDirective } from './ngx-suggest.directive';

const publicApi = [
  NgxSuggestComponent,
  NgxSuggestDirective,
  NgxSuggestContentDirective,
  NgxOptionComponent
];

@NgModule({
  imports: [CommonModule, OverlayModule, ReactiveFormsModule],
  declarations: [publicApi],
  exports: [publicApi]
})
export class NgxSuggestModule {}
