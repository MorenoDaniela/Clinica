import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaParaMostrarComponent } from './historia-para-mostrar.component';

describe('HistoriaParaMostrarComponent', () => {
  let component: HistoriaParaMostrarComponent;
  let fixture: ComponentFixture<HistoriaParaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaParaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaParaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
