import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewApprovalComponent } from './p-new-approval.component';

describe('PNewApprovalComponent', () => {
  let component: PNewApprovalComponent;
  let fixture: ComponentFixture<PNewApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNewApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
