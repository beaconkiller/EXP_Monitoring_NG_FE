import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSignaturePadComponent } from './c-signature-pad.component';

describe('CSignaturePadComponent', () => {
  let component: CSignaturePadComponent;
  let fixture: ComponentFixture<CSignaturePadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSignaturePadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSignaturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
