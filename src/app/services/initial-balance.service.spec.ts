import { TestBed } from '@angular/core/testing';

import { InitialBalanceService } from './initial-balance.service';

describe('InitialBalanceService', () => {
  let service: InitialBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
