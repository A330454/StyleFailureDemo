import { TestBed } from '@angular/core/testing';

import { DriverEvalService } from './driver-eval.service';

describe('DriverEvalService', () => {
  let service: DriverEvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverEvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
