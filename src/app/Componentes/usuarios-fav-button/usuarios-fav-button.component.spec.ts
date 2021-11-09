import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFavButtonComponent } from './usuarios-fav-button.component';

describe('UsuariosFavButtonComponent', () => {
  let component: UsuariosFavButtonComponent;
  let fixture: ComponentFixture<UsuariosFavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosFavButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosFavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
