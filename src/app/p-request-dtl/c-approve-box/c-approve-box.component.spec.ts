import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CApproveBoxComponent } from './c-approve-box.component';

describe('CApproveBoxComponent', () => {
  let component: CApproveBoxComponent;
  let fixture: ComponentFixture<CApproveBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CApproveBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CApproveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
