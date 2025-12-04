import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConfiguracion } from './formulario-configuracion';

describe('FormularioConfiguracion', () => {
  let component: FormularioConfiguracion;
  let fixture: ComponentFixture<FormularioConfiguracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConfiguracion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConfiguracion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
