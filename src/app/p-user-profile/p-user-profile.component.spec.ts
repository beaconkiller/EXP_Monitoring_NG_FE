import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUserProfileComponent } from './p-user-profile.component';

describe('PUserProfileComponent', () => {
  let component: PUserProfileComponent;
  let fixture: ComponentFixture<PUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
