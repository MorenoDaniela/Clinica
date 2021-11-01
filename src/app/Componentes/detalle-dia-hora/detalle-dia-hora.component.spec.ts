import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDiaHoraComponent } from './detalle-dia-hora.component';

describe('DetalleDiaHoraComponent', () => {
  let component: DetalleDiaHoraComponent;
  let fixture: ComponentFixture<DetalleDiaHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDiaHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDiaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
