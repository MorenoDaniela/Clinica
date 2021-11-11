import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajarPdfComponent } from './bajar-pdf.component';

describe('BajarPdfComponent', () => {
  let component: BajarPdfComponent;
  let fixture: ComponentFixture<BajarPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajarPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
