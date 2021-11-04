import { TestBed } from '@angular/core/testing';

import { PuedoVerPacienteYAdminGuard } from './puedo-ver-paciente-yadmin.guard';

describe('PuedoVerPacienteYAdminGuard', () => {
  let guard: PuedoVerPacienteYAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PuedoVerPacienteYAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
