import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CItemPengajuanComponent } from './c-item-pengajuan.component';

describe('CItemPengajuanComponent', () => {
  let component: CItemPengajuanComponent;
  let fixture: ComponentFixture<CItemPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CItemPengajuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CItemPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
