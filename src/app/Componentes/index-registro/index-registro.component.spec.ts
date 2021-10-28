import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRegistroComponent } from './index-registro.component';

describe('IndexRegistroComponent', () => {
  let component: IndexRegistroComponent;
  let fixture: ComponentFixture<IndexRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
