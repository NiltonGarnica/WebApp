import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPrueba } from './boton-prueba';

describe('BotonPrueba', () => {
  let component: BotonPrueba;
  let fixture: ComponentFixture<BotonPrueba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonPrueba]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonPrueba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
