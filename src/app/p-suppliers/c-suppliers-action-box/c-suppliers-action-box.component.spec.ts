import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSuppliersActionBoxComponent } from './c-suppliers-action-box.component';

describe('CSuppliersActionBoxComponent', () => {
  let component: CSuppliersActionBoxComponent;
  let fixture: ComponentFixture<CSuppliersActionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSuppliersActionBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSuppliersActionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
