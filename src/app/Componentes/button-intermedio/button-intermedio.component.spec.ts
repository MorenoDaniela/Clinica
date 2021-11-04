import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIntermedioComponent } from './button-intermedio.component';

describe('ButtonIntermedioComponent', () => {
  let component: ButtonIntermedioComponent;
  let fixture: ComponentFixture<ButtonIntermedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonIntermedioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonIntermedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
