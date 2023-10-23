import { TestBed } from '@angular/core/testing';

import { AccesoUsuariosGuard } from './acceso-usuarios.guard';

describe('AccesoUsuariosGuard', () => {
  let guard: AccesoUsuariosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoUsuariosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
