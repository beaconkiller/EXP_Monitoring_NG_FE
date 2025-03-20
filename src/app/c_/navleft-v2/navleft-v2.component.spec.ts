import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavleftV2Component } from './navleft-v2.component';

describe('NavleftV2Component', () => {
  let component: NavleftV2Component;
  let fixture: ComponentFixture<NavleftV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavleftV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavleftV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
