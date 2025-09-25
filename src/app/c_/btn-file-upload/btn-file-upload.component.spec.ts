import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFileUploadComponent } from './btn-file-upload.component';

describe('BtnFileUploadComponent', () => {
  let component: BtnFileUploadComponent;
  let fixture: ComponentFixture<BtnFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
