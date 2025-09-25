import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpCompComponent } from './inp-comp.component';

describe('InpCompComponent', () => {
  let component: InpCompComponent;
  let fixture: ComponentFixture<InpCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InpCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
