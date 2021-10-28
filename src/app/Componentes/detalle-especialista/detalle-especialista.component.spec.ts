import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEspecialistaComponent } from './detalle-especialista.component';

describe('DetalleEspecialistaComponent', () => {
  let component: DetalleEspecialistaComponent;
  let fixture: ComponentFixture<DetalleEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
