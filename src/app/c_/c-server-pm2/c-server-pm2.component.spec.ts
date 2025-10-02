import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CServerPm2Component } from './c-server-pm2.component';

describe('CServerPm2Component', () => {
  let component: CServerPm2Component;
  let fixture: ComponentFixture<CServerPm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CServerPm2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CServerPm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
