import { TestBed } from '@angular/core/testing';

import { AuthGuardChild } from './auth-guard-child.service';

describe('AuthGuardChildService', () => {
  let service: AuthGuardChild;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardChild);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
