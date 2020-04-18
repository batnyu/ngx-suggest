import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { NgxSuggestComponent } from './ngx-suggest.component';
import { fromEvent } from 'rxjs';
import {
  OverlayRef,
  Overlay,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { NgControl } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { takeUntil, filter } from 'rxjs/operators';

@Directive({
  selector: '[ngxSuggest]'
})
export class NgxSuggestDirective implements OnInit, OnDestroy {
  @Input() ngxSuggest: NgxSuggestComponent;
  private overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {}

  get control() {
    return this.ngControl.control;
  }

  get origin() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    fromEvent(this.origin, 'focus')
      .pipe(
        untilDestroyed(this),
        filter(() => !this.overlayRef)
      )
      .subscribe(() => {
        this.openDropdown();

        this.ngxSuggest
          .optionsClick()
          .pipe(takeUntil(this.overlayRef.detachments()))
          .subscribe((value: string) => {
            this.control.setValue(value);
            this.close();
          });
      });
  }

  ngOnDestroy() {}

  openDropdown() {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.ngxSuggest.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() =>
      this.close()
    );
  }

  private close() {
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition() {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }
}

export function overlayClickOutside(
  overlayRef: OverlayRef,
  origin: HTMLElement
) {
  return fromEvent<MouseEvent>(document, 'mousedown').pipe(
    filter(event => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== origin;
      const notOverlay =
        !!overlayRef &&
        overlayRef.overlayElement.contains(clickTarget) === false;
      return notOrigin && notOverlay;
    }),
    takeUntil(overlayRef.detachments())
  );
}
