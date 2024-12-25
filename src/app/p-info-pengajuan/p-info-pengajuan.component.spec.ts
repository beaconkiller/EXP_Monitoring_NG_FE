import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PInfoPengajuanComponent } from './p-info-pengajuan.component';

describe('PInfoPengajuanComponent', () => {
  let component: PInfoPengajuanComponent;
  let fixture: ComponentFixture<PInfoPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PInfoPengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PInfoPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
