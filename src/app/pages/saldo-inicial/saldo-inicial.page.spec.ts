import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaldoInicialPage } from './saldo-inicial.page';

describe('SaldoInicialPage', () => {
  let component: SaldoInicialPage;
  let fixture: ComponentFixture<SaldoInicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
