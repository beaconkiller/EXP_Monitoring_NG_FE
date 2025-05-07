import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRevisiPengajuanComponent } from './p-revisi-pengajuan.component';

describe('PRevisiPengajuanComponent', () => {
  let component: PRevisiPengajuanComponent;
  let fixture: ComponentFixture<PRevisiPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRevisiPengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRevisiPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
