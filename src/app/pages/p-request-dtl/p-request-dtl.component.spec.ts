import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRequestDtlComponent } from './p-request-dtl.component';

describe('PRequestDtlComponent', () => {
  let component: PRequestDtlComponent;
  let fixture: ComponentFixture<PRequestDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRequestDtlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRequestDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
