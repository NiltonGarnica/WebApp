import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReportes } from './tabla-reportes';

describe('TablaReportes', () => {
  let component: TablaReportes;
  let fixture: ComponentFixture<TablaReportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaReportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaReportes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
