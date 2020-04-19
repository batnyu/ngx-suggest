import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuggestComponent } from './ngx-suggest.component';

describe('NgxSuggestComponent', () => {
  let component: NgxSuggestComponent;
  let fixture: ComponentFixture<NgxSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
