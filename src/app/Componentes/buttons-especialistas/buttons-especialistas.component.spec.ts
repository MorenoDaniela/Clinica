import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsEspecialistasComponent } from './buttons-especialistas.component';

describe('ButtonsEspecialistasComponent', () => {
  let component: ButtonsEspecialistasComponent;
  let fixture: ComponentFixture<ButtonsEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsEspecialistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
