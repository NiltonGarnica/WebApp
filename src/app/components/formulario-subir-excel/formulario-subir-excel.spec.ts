import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSubirExcel } from './formulario-subir-excel';

describe('FormularioSubirExcel', () => {
  let component: FormularioSubirExcel;
  let fixture: ComponentFixture<FormularioSubirExcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioSubirExcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSubirExcel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
