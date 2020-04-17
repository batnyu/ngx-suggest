import { TestBed } from '@angular/core/testing';

import { NgxSuggestService } from './ngx-suggest.service';

describe('NgxSuggestService', () => {
  let service: NgxSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuggestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
