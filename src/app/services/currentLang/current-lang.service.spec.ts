import { TestBed } from '@angular/core/testing';

import { CurrentLangService } from './current-lang.service';

describe('CurrentLangService', () => {
  let service: CurrentLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
