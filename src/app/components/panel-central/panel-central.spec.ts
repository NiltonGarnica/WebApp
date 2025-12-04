import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCentral } from './panel-central';

describe('PanelCentral', () => {
  let component: PanelCentral;
  let fixture: ComponentFixture<PanelCentral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCentral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCentral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
