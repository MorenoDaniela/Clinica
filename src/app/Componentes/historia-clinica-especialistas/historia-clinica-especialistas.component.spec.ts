import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaEspecialistasComponent } from './historia-clinica-especialistas.component';

describe('HistoriaClinicaEspecialistasComponent', () => {
  let component: HistoriaClinicaEspecialistasComponent;
  let fixture: ComponentFixture<HistoriaClinicaEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaEspecialistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
