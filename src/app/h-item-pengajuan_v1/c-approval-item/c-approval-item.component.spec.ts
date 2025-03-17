import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CApprovalItemComponent } from './c-approval-item.component';

describe('CApprovalItemComponent', () => {
  let component: CApprovalItemComponent;
  let fixture: ComponentFixture<CApprovalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CApprovalItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CApprovalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
