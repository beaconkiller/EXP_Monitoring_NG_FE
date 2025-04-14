import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoadingSpinComponent } from './c-loading-spin.component';

describe('CLoadingSpinComponent', () => {
  let component: CLoadingSpinComponent;
  let fixture: ComponentFixture<CLoadingSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLoadingSpinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLoadingSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
