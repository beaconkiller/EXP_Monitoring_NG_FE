import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPengajuanMemoInternalComponent } from './p-pengajuan-memo-internal.component';

describe('PPengajuanMemoInternalComponent', () => {
  let component: PPengajuanMemoInternalComponent;
  let fixture: ComponentFixture<PPengajuanMemoInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PPengajuanMemoInternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPengajuanMemoInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
