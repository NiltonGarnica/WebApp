import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasResumen } from './tarjetas-resumen';

describe('TarjetasResumen', () => {
  let component: TarjetasResumen;
  let fixture: ComponentFixture<TarjetasResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetasResumen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasResumen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
