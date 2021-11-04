import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaAdministradoresComponent } from './historia-clinica-administradores.component';

describe('HistoriaClinicaAdministradoresComponent', () => {
  let component: HistoriaClinicaAdministradoresComponent;
  let fixture: ComponentFixture<HistoriaClinicaAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaAdministradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
