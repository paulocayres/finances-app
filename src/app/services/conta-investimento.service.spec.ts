import { TestBed } from '@angular/core/testing';

import { ContaInvestimentoService } from './conta-investimento.service';

describe('ContaInvestimentoService', () => {
  let service: ContaInvestimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaInvestimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
