import { FilterTurnoByPacienteEmailPipe } from './filter-turno-by-paciente-email.pipe';

describe('FilterTurnoByPacienteEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTurnoByPacienteEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
