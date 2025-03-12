import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoadingWidgetComponent } from './c-loading-widget.component';

describe('CLoadingWidgetComponent', () => {
  let component: CLoadingWidgetComponent;
  let fixture: ComponentFixture<CLoadingWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLoadingWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLoadingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
