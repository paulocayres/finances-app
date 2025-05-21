import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaMensalPage } from './agenda-mensal.page';

describe('AgendaMensalPage', () => {
  let component: AgendaMensalPage;
  let fixture: ComponentFixture<AgendaMensalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaMensalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
