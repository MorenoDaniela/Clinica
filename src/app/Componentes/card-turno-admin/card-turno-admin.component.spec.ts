import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTurnoAdminComponent } from './card-turno-admin.component';

describe('CardTurnoAdminComponent', () => {
  let component: CardTurnoAdminComponent;
  let fixture: ComponentFixture<CardTurnoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTurnoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTurnoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
