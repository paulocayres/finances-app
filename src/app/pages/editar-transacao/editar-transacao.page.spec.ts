import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTransacaoPage } from './editar-transacao.page';

describe('EditarTransacaoPage', () => {
  let component: EditarTransacaoPage;
  let fixture: ComponentFixture<EditarTransacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTransacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
