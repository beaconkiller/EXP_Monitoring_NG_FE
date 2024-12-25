import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FBiayaOperasionalComponent } from './f-biaya-operasional.component';

describe('FBiayaOperasionalComponent', () => {
  let component: FBiayaOperasionalComponent;
  let fixture: ComponentFixture<FBiayaOperasionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FBiayaOperasionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FBiayaOperasionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
