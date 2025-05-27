import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContaInvestimentoPage } from './conta-investimento.page';

describe('ContaInvestimentoPage', () => {
  let component: ContaInvestimentoPage;
  let fixture: ComponentFixture<ContaInvestimentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaInvestimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
