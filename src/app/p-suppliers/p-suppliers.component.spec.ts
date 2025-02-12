import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSuppliersComponent } from './p-suppliers.component';

describe('PSuppliersComponent', () => {
  let component: PSuppliersComponent;
  let fixture: ComponentFixture<PSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSuppliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
