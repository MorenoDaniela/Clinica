import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaPacientesComponent } from './historia-clinica-pacientes.component';

describe('HistoriaClinicaPacientesComponent', () => {
  let component: HistoriaClinicaPacientesComponent;
  let fixture: ComponentFixture<HistoriaClinicaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
