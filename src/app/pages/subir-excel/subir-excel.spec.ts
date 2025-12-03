import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirExcel } from './subir-excel';

describe('SubirExcel', () => {
  let component: SubirExcel;
  let fixture: ComponentFixture<SubirExcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirExcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirExcel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
