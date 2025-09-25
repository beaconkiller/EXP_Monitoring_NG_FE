import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLovComponent } from './btn-lov.component';

describe('BtnLovComponent', () => {
  let component: BtnLovComponent;
  let fixture: ComponentFixture<BtnLovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
