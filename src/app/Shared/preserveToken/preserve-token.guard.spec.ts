import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preserveTokenGuard } from './preserve-token.guard';

describe('preserveTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preserveTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
