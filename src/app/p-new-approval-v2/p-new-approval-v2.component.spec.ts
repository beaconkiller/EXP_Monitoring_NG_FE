import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewApprovalV2Component } from './p-new-approval-v2.component';

describe('PNewApprovalV2Component', () => {
  let component: PNewApprovalV2Component;
  let fixture: ComponentFixture<PNewApprovalV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNewApprovalV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNewApprovalV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
