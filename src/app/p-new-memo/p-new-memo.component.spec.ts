import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewMemoComponent } from './p-new-memo.component';

describe('PNewMemoComponent', () => {
  let component: PNewMemoComponent;
  let fixture: ComponentFixture<PNewMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNewMemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNewMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
