import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFileUploadMultipleComponent } from './btn-file-upload-multiple.component';

describe('BtnFileUploadMultipleComponent', () => {
  let component: BtnFileUploadMultipleComponent;
  let fixture: ComponentFixture<BtnFileUploadMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnFileUploadMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnFileUploadMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
