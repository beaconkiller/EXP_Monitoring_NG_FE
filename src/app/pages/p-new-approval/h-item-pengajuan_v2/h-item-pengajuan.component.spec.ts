import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HItemPengajuanComponent } from './h-item-pengajuan.component';

describe('HItemPengajuanComponent', () => {
  let component: HItemPengajuanComponent;
  let fixture: ComponentFixture<HItemPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HItemPengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HItemPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
