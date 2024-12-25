import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PLoginComponent } from './p-login.component';

describe('PLoginComponent', () => {
  let component: PLoginComponent;
  let fixture: ComponentFixture<PLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
