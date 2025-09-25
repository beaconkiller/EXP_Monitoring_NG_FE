import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLovSearchComponent } from './btn-lov-search.component';

describe('BtnLovSearchComponent', () => {
  let component: BtnLovSearchComponent;
  let fixture: ComponentFixture<BtnLovSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLovSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnLovSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
