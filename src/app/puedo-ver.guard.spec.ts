import { TestBed } from '@angular/core/testing';

import { PuedoVerGuard } from './puedo-ver.guard';

describe('PuedoVerGuard', () => {
  let guard: PuedoVerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PuedoVerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
