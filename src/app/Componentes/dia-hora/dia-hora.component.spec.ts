import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaHoraComponent } from './dia-hora.component';

describe('DiaHoraComponent', () => {
  let component: DiaHoraComponent;
  let fixture: ComponentFixture<DiaHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
